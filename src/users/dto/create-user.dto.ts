import { IsNotEmpty, IsString, IsNumber, MinLength } from 'class-validator';

export class CreateUserDto {
  //   @IsString()
  //   @IsNotEmpty()
  //   id: string;

  //   @IsNotEmpty()
  //   @IsString()
  //   email: string;

  //   @IsNotEmpty()
  //   @IsString()
  //   username: string;

  //   @IsNotEmpty()
  //   @IsString()
  //   @MinLength(8)
  //   password: string;

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
