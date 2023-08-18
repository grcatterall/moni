import * as express from 'express';
import { Event } from '../models/Event';
import { JSONResponse } from '../libs/JSONResponse';
import { ServiceRepository } from '../repositories/ServiceRepository';
import { PrismaClient } from '@prisma/client';
import { EventIngestHandler } from '../handlers/EventIngestHandler';

const router = express.Router();
const prismaClient = new PrismaClient();

const serviceRepository = new ServiceRepository(prismaClient);

router.post('/ingest', async (req: express.Request, res: express.Response) => {
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

router.post('/service/create', async (req: express.Request, res: express.Response) => {
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
