import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@exceptions/HttpException';
import { verifyHash } from '@/services/hash.service';

const hashMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.headers['_skuser'] ? (req.headers['_skuser'] as string) : '';
  const assistant_id = req.headers['_skassistant'] ? (req.headers['_skassistant'] as string) : '';
  const app = req.headers['_skapp'] ? (req.headers['_skapp'] as string) : '';
  const hash = req.headers['_skhash'] ? (req.headers['_skhash'] as string) : '';
  console.log({ user, assistant_id, app, hash });
  try {
    if (verifyHash(user, assistant_id, app, hash)) {
      next();
    } else {
      next(new HttpException(401, 'Not Authorized'));
    }
  } catch (error) {
    next(new HttpException(401, 'Failed to authorize'));
  }
};

export default hashMiddleware;
