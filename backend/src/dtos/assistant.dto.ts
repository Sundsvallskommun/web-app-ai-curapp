import { AssistantCreatePublic, AssistantUpsertPublic, GroupId, PaginatedResponseAssistantPublic } from '@/data-contracts/intric/data-contracts';
import { IsArray, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateAssistantDto implements AssistantCreatePublic {
  @IsString()
  name: string;
  @IsString()
  prompt: string;
  @IsString()
  completion_model: string;
  @IsObject()
  @IsOptional()
  completion_model_kwargs?: object;
  @IsArray()
  @IsOptional()
  groups?: GroupId[];
}

export class UpdateAssistantDto implements AssistantUpsertPublic {
  @IsString()
  @IsOptional()
  name: string;
  @IsString()
  @IsOptional()
  prompt: string;
  @IsString()
  @IsOptional()
  completion_model: string;
  @IsObject()
  @IsOptional()
  completion_model_kwargs?: object;
  @IsArray()
  @IsOptional()
  groups?: GroupId[];
}
