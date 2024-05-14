import { CreateGroupRequest, GroupUpdatePublic } from '@/data-contracts/intric/data-contracts';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateGroupDto implements CreateGroupRequest {
  @IsString()
  name: string;
  @IsBoolean()
  @IsOptional()
  is_public?: boolean;
  @IsString()
  @IsOptional()
  embedding_model?: string;
}

export class UpdateGroupDto implements GroupUpdatePublic {
  @IsString()
  name: string;
  @IsBoolean()
  @IsOptional()
  is_public?: boolean;
}
