import { Request, Response } from 'express';
import { EventType } from '../type/EventType';

export class JSONResponse {
  static success(req: Request, res: Response, message: string, data: any | null) {
    res.status(200).json({
      code: 200,
      message: message || 'success',
      data: data,
    });
  }

  static serverError(req: Request, res: Response, message: string | null, data: null) {
    res.status(500).json({
      code: 500,
      message: message || 'failed',
      data: data,
    });
  }
}
