import * as express from 'express';
import { Event } from '../models/Event';
import { JSONResponse } from '../libs/JSONResponse';
import { ServiceRepository, EventRepository } from '../repositories';
import { PrismaClient } from '@prisma/client';
import { EventIngestHandler } from '../handlers/EventIngestHandler';

const router = express.Router();
const prismaClient = new PrismaClient();

const serviceRepository = new ServiceRepository(prismaClient);
const eventRepository = new EventRepository(prismaClient);


router.post('/events/ingest', async (req: express.Request, res: express.Response) => {
  try {
    if (req.body) {
      const eventIngester =  new EventIngestHandler();
      const event = await eventIngester.handleEvent(req.body);

      if (event) {
        JSONResponse.success(req, res, 'Event ingested', event.toJson());
      }
    }
  } catch (error) {
    let errorMessage = null;
    if (typeof error === 'string') {
      errorMessage = error;
    }
    console.log(error);
    JSONResponse.serverError(req, res, errorMessage, null);
  }
});

router.get('/events/fetch', async (req: express.Request, res: express.Response) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    if (req.query.serviceId) {
      const events = await eventRepository.getByServiceId(req.query.serviceId);

      if (events) {
        JSONResponse.success(req, res, 'Event ingested', events);
      }
    } else {
      JSONResponse.serverError(req, res, 'Missing Parameters', null);
    }
  } catch (error) {
    let errorMessage = null;
    if (typeof error === 'string') {
      errorMessage = error;
    }
    console.log(error);
    JSONResponse.serverError(req, res, errorMessage, null);
  }
});

router.post('/service/create', async (req: express.Request, res: express.Response) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    if (req.body) {
      await serviceRepository.insert(req.body.name);

      JSONResponse.success(req, res, 'Service ingested', null);
    }
  } catch (error) {
    let errorMessage = null;
    if (typeof error === 'string') {
      errorMessage = error;
    }
    JSONResponse.serverError(req, res, errorMessage, null);
  }
});

router.get('/service/list', async (req: express.Request, res: express.Response) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    const services = await serviceRepository.getAll();

    JSONResponse.success(req, res, 'Service ingested', services);
    
  } catch (error) {
    let errorMessage = null;
    if (typeof error === 'string') {
      errorMessage = error;
    }
    JSONResponse.serverError(req, res, errorMessage, null);
  }
});

export default router;
