import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty()
  @IsString()
  comment: string;

  @ApiProperty()
  @IsNumber()
  image_id: number;
}
