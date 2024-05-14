import { InfoBlobPublic, InfoBlobUpdatePublic, PaginatedResponseInfoBlobPublicNoText } from '@/data-contracts/intric/data-contracts';
import { UpdateInfoBlobDto } from '@/dtos/info-blob.dto';
import applicationModeMiddleware from '@/middlewares/application-mode.middleware';
import { validationMiddleware } from '@/middlewares/validation.middleware';
import ApiService from '@/services/api.service';
import IntricApiService from '@/services/intric-api.service';
import { Body, Controller, Delete, Get, Param, Post, UseBefore } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';

@UseBefore(applicationModeMiddleware)
@Controller()
export class InfoBlobController {
  private apiService = new ApiService();
  private intricApiService = new IntricApiService();

  @Get('/info-blobs')
  @OpenAPI({
    summary: 'Get info blobs',
  })
  async get_infoblobs(): Promise<PaginatedResponseInfoBlobPublicNoText> {
    const url = '/info-blobs/';
    const res = await this.intricApiService.get<PaginatedResponseInfoBlobPublicNoText>({ url });
    return res.data;
  }

  @Get('/info-blobs/:id')
  @OpenAPI({
    summary: 'Get info blob by id',
  })
  async get_infoblob_by_id(@Param('id') id: string): Promise<InfoBlobPublic> {
    const url = `/info-blobs/${id}/`;
    const res = await this.intricApiService.get<InfoBlobPublic>({ url });
    return res.data;
  }

  @Post('/info-blobs/:id')
  @OpenAPI({
    summary: 'Update info blob',
  })
  @UseBefore(validationMiddleware(UpdateInfoBlobDto, 'body'))
  async update_infoblob(@Param('id') id: string, @Body() body: UpdateInfoBlobDto): Promise<InfoBlobPublic> {
    const url = `/info-blobs/${id}/`;
    const res = await this.intricApiService.post<InfoBlobPublic, InfoBlobUpdatePublic>({ url, data: body });
    return res.data;
  }

  @Delete('/info-blobs/:id')
  @OpenAPI({
    summary: 'Delete info blob',
  })
  async delete_infoblob(@Param('id') id: string): Promise<InfoBlobPublic> {
    const url = `/info-blobs/${id}/`;
    const res = await this.intricApiService.delete<InfoBlobPublic>({ url });
    return res.data;
  }
}
