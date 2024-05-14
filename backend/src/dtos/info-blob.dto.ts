import { InfoBlobAddPublic, InfoBlobMetadataUpsertPublic, InfoBlobUpdatePublic, InfoBlobUpsertRequest } from '@/data-contracts/intric/data-contracts';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';

export class InfoBlobMetadata implements InfoBlobMetadataUpsertPublic {
  @IsString()
  url: string;
  @IsString()
  title: string;
}

export class UpdateInfoBlobDto implements InfoBlobUpdatePublic {
  @IsString()
  @IsOptional()
  text?: string;
  @IsOptional()
  @ValidateNested()
  @Type(() => InfoBlobMetadata)
  metadata: InfoBlobMetadataUpsertPublic;
}

export class UpdateInfoBlobsDto implements InfoBlobUpsertRequest {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateInfoBlobDto)
  info_blobs: InfoBlobAddPublic[];
}
