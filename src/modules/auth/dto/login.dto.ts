import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsString()
  @IsEmail({}, { message: `Email is not validation` })
  email: string;
  pass_word: string;
}
