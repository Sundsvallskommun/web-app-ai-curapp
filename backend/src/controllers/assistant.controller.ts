import {
  AssistantCreatePublic,
  AssistantPublic,
  AssistantUpsertPublic,
  PaginatedResponseAssistantPublic,
  PaginatedResponseSessionMetadataPublic,
  SessionPublic,
} from '@/data-contracts/intric/data-contracts';
import { CreateAssistantDto, UpdateAssistantDto } from '@/dtos/assistant.dto';
import applicationModeMiddleware from '@/middlewares/application-mode.middleware';
import hashMiddleware from '@/middlewares/hash.middleware';
import { validationMiddleware } from '@/middlewares/validation.middleware';
import { getApiKey } from '@/services/intric-api-key.service';
import IntricApiService from '@/services/intric-api.service';
import { Request } from 'express';
import { Body, Controller, Delete, Get, Param, Post, Req, UseBefore } from 'routing-controllers';

@UseBefore(applicationModeMiddleware)
@Controller()
export class AssistantController {
  private intricApiService = new IntricApiService();
  @Get('/assistants')
  @UseBefore(hashMiddleware)
  async get_assistants(@Req() req) {
    const url = '/assistants/';
    const apiKey = getApiKey(req);
    const res = await this.intricApiService.get<PaginatedResponseAssistantPublic>({ url, headers: { 'api-key': apiKey } });
    return res.data;
  }

  @Post('/assistants')
  @UseBefore(hashMiddleware)
  @UseBefore(validationMiddleware(CreateAssistantDto, 'body'))
  async create_assistant(@Req() req, @Body() body: CreateAssistantDto): Promise<AssistantPublic> {
    const url = `/assistants/`;
    const apiKey = getApiKey(req);
    const res = await this.intricApiService.post<AssistantPublic, AssistantCreatePublic>({ url, headers: { 'api-key': apiKey }, data: body });
    return res.data;
  }

  @Get('/assistants/:id')
  @UseBefore(hashMiddleware)
  async get_assistant_by_id(@Req() req, @Param('id') id: string) {
    const url = `/assistants/${id}`;
    const apiKey = getApiKey(req);
    const res = await this.intricApiService.get<AssistantPublic>({ url, headers: { 'api-key': apiKey } });
    return res.data;
  }

  @Post('/assistants/:id')
  @UseBefore(hashMiddleware)
  @UseBefore(validationMiddleware(UpdateAssistantDto, 'body'))
  async update_assistant(@Req() req: Request, @Param('id') id: string, @Body() body: UpdateAssistantDto): Promise<AssistantPublic> {
    const url = `/groups/${id}/`;
    const apiKey = getApiKey(req);
    const res = await this.intricApiService.post<AssistantPublic, AssistantUpsertPublic>({ url, headers: { 'api-key': apiKey }, data: body });
    return res.data;
  }

  @Delete('/assistants/:id')
  @UseBefore(hashMiddleware)
  async delete_assistant(@Req() req: Request, @Param('id') id: string): Promise<AssistantPublic> {
    const url = `/groups/${id}/`;
    const apiKey = getApiKey(req);
    const res = await this.intricApiService.delete<AssistantPublic>({ url, headers: { 'api-key': apiKey } });
    return res.data;
  }

  @Get('/assistants/:id/sessions')
  @UseBefore(hashMiddleware)
  async get_assistant_sessions(@Req() req, @Param('id') id: string) {
    const url = `/assistants/${id}/sessions/`;
    const apiKey = getApiKey(req);
    const res = await this.intricApiService.get<PaginatedResponseSessionMetadataPublic>({ url, headers: { 'api-key': apiKey } });
    return res.data;
  }

  @Get('/assistants/:id/sessions/:session_id')
  @UseBefore(hashMiddleware)
  async get_assistant_session(@Req() req, @Param('id') id: string, @Param('session_id') session_id: string) {
    const url = `/assistants/${id}/sessions/${session_id}`;
    const apiKey = getApiKey(req);
    const res = await this.intricApiService.get<SessionPublic>({ url, headers: { 'api-key': apiKey } });
    return res.data;
  }
}
