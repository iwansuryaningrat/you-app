import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  name: string;

  @IsString()
  birthday: string;

  @IsString()
  @IsOptional()
  horoscope: string;

  @IsString()
  @IsOptional()
  zodiac: string;

  @IsNumber()
  height: number;

  @IsNumber()
  weight: number;

  @IsString({ each: true })
  interests: string[];
}
