// import { INTRIC_SALT } from '@/config';
import { logger } from '@/utils/logger';
import 'crypto';
import { createHash, createHmac } from 'crypto';

export const verifyHash = (user: string, assistant_id: string, app: string, hash: string) => {
  if (typeof user !== 'string') {
    logger.error('User value missing');
    return false;
  }
  if (typeof assistant_id !== 'string') {
    logger.error('Assistant id value missing');
    return false;
  }
  if (typeof app !== 'string') {
    logger.error('Application id missing');
    return false;
  }
  if (typeof hash !== 'string') {
    logger.error('Hash value missing');
    return false;
  }
  // const salt = INTRIC_SALT;
  // const input = `${user}${assistant_id}${app}${salt}`;
  const input = `${user}${assistant_id}${app}`;
  console.log('Using input:');
  console.log(input);
  // const _hash = createHmac('sha256', salt).update(input).digest('base64url');
  const _hash = createHash('sha256').update(input).digest('base64');
  console.log('calculated hash:', _hash);
  return typeof hash !== 'undefined' && typeof _hash !== 'undefined' && _hash === hash;
};
