import * as express from 'express';
import { Event } from '../models/Event';
import { JSONResponse } from '../libs/JSONResponse';

const router = express.Router();

router.post('/ingest', (req: express.Request, res: express.Response) => {
  try {
    const event = new Event(req.body.name, req.body.time, req.body.status, req.body.service, req.body.message);

    JSONResponse.success(req, res, 'Event ingested', event.toJson());
  } catch (error) {
    let errorMessage = null;
    if (typeof error === 'string') {
        errorMessage = error;
    }
    JSONResponse.serverError(req, res, errorMessage, null);
  }
});

export default router;
