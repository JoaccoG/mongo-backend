import { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'express-validation';
import log from '../logger.js';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof ValidationError) {
    log.error(err);
    return res.status(err.statusCode).json(err);
  }

  log.error(err);
  return res.status(500).json(err);
};
