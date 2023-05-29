import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  //   @IsString()
  //   @IsNotEmpty()
  //   id: string;

  @IsString()
  name: string;

  @IsString()
  birthday: string;

  @IsString()
  horoscope: string;

  @IsNumber()
  height: number;

  @IsNumber()
  weight: number;

  @IsString({ each: true })
  interests: string[];
}
