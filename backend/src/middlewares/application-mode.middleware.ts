import { APPLICATION_MODE } from '@/config';
import { HttpException } from '@/exceptions/HttpException';
import { NextFunction, Request, Response } from 'express';

const applicationModeMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  if (APPLICATION_MODE === 'INTERNAL') {
    next();
  } else {
    next(new HttpException(418, 'I am a teapot'));
  }
};

export default applicationModeMiddleware;
