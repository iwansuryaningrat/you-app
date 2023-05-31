import { IsString, IsNumber } from 'class-validator';

export class CreateUserDto {
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
