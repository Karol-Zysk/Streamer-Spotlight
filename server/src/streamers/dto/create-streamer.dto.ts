import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { Platform } from '../../utils/enums';

export class CreateStreamerDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  description: string;
  @IsEnum(Platform)
  @IsNotEmpty()
  platform: string;
  @IsString()
  @IsNotEmpty()
  image: string;
}
