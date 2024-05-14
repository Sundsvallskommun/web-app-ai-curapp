import { AskAssistant } from '@/data-contracts/intric/data-contracts';
import hashMiddleware from '@/middlewares/hash.middleware';
import { getAssistant } from '@/services/assistants.service';
import { getApiKey } from '@/services/intric-api-key.service';
import IntricApiService from '@/services/intric-api.service';
import { ServerResponse } from 'http';
import { Body, Controller, HttpError, Param, Post, QueryParam, Req, Res, UseBefore } from 'routing-controllers';
import { Stream } from 'stream';

@Controller()
export class QueryController {
  private intricApiService = new IntricApiService();

  // @Post('/assistants/:assistant_id/sessions')
  @Post('/ask')
  // @UseBefore(hashMiddleware)
  async ask_assistant(@Req() req: any, @QueryParam('stream') stream: boolean, @Body() body, @Res() response: ServerResponse): Promise<any> {
    if (!body?.body || body?.body === '') {
      throw new HttpError(400, 'Empty body');
    }
    const query = body?.body;
    console.log({ query });
    const assistant_id = getAssistant(req);
    const url = `/assistants/${assistant_id}/sessions/`;
    const apiKey = getApiKey(req);
    const responseType = 'stream';
    const data: AskAssistant = {
      question: body.body,
      stream,
    };
    const res = await this.intricApiService.post<Stream, AskAssistant>({ url, headers: { 'api-key': apiKey }, responseType, data });
    const datastream = res.data;
    let i = 0;
    datastream.on('data', (buf: Buffer) => {
      return buf;
    });

    datastream.on('end', () => {
      console.log('stream done');
      return response.end();
    });
    return res.data;
  }

  // @Post('/assistants/:assistant_id/sessions/:session_id')
  @Post('/ask/:session_id')
  // @UseBefore(hashMiddleware)
  async ask_followup(
    @Req() req: any,
    @Param('session_id') session_id: string,
    @QueryParam('stream') stream: boolean,
    @Body() body,
    @Res() response: ServerResponse,
  ): Promise<any> {
    if (!body?.body || body?.body === '') {
      throw new HttpError(400, 'Empty body');
    }
    const query = body?.body;
    console.log({ query });
    const apiKey = getApiKey(req);
    const assistant_id = getAssistant(req);
    const url = `/assistants/${assistant_id}/sessions/${session_id}/`;
    const responseType = 'stream';
    const data: AskAssistant = {
      question: body.body,
      stream,
    };
    const res = await this.intricApiService.post<Stream, AskAssistant>({ url, headers: { 'api-key': apiKey }, responseType, data });
    const datastream = res.data;
    let i = 0;
    datastream.on('data', (buf: Buffer) => {
      return buf;
    });

    datastream.on('end', () => {
      console.log('stream done');
      return response.end();
    });
    return res.data;
  }
}
