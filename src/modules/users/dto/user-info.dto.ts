import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsUrl, IsOptional } from 'class-validator';

export class UserInfoDto {
  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsUrl()
  avatar?: string;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  full_name?: string;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  introduction?: string;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsUrl()
  web_link?: string;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  display_name?: string;
}
