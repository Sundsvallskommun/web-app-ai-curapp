import { INTRIC_ASSISTANT_ANGE } from '@/config';
import { Request } from 'express';

export const getAssistant = (req: Request) => {
  // TODO How to handle app name in cura?
  const app = 'ange'; //req.headers['_skapp'] ? (req.headers['_skapp'] as string) : undefined;
  if (typeof app !== 'string') {
    console.log('Application id missing');
    return false;
  }
  console.log('inbound app:', app);
  switch (app) {
    case 'ange':
      console.log('Returning assistant for Ånge');
      return INTRIC_ASSISTANT_ANGE;
    default:
      return undefined;
  }
};
