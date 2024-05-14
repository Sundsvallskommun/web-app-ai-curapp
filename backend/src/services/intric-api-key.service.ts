import { INTRIC_APIKEY_ANGE } from '@/config';
import { Request } from 'express';

export const getApiKey = (req: Request) => {
  const app = 'ange'; // req.headers['_skapp'] ? (req.headers['_skapp'] as string) : undefined;
  if (typeof app !== 'string') {
    console.log('Application id missing');
    return false;
  }
  console.log('inbound app:', app);
  switch (app) {
    case 'ange':
      console.log('Returning api key for Ånge');
      return INTRIC_APIKEY_ANGE;
    default:
      return undefined;
  }
};
