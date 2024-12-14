import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
} from '@nestjs/common';
import { SavedImagesService } from './saved-images.service';
import { CreateSavedImageDto } from './dto/create-saved-image.dto';
import { UpdateSavedImageDto } from './dto/update-saved-image.dto';
import { User } from 'src/common/decorators/user.decorator';
import { TUser } from 'src/common/types/types';
import { ApiQuery } from '@nestjs/swagger';
import { Request } from 'express';

@Controller('saved-images')
export class SavedImagesController {
  constructor(private readonly savedImagesService: SavedImagesService) {}

  @Post(`:image_id`)
  create(@User() user: TUser, @Param(`image_id`) image_id: number) {
    return this.savedImagesService.create(user, image_id);
  }

  @Get(':user_id')
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number for pagination',
  })
  @ApiQuery({
    name: 'pageSize',
    required: false,
    description: 'Number of items per page',
  })
  findAll(
    @Param(`user_id`) user_id: number,
    @User() user: TUser,
    @Req() req: Request,
    @Query(`page`) page?: string,
    @Query(`pageSize`) pageSize?: string,
  ) {
    return this.savedImagesService.findAll(user, +user_id, req);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.savedImagesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSavedImageDto: UpdateSavedImageDto,
  ) {
    return this.savedImagesService.update(+id, updateSavedImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.savedImagesService.remove(+id);
  }
}
