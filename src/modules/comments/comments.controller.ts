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
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { User } from 'src/common/decorators/user.decorator';
import { TUser } from 'src/common/types/types';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiQuery } from '@nestjs/swagger';
import { Request } from 'express';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto, @User() user: TUser) {
    return this.commentsService.create(createCommentDto, user);
  }

  @Public()
  @Get('comment-list/:image_id')
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
  findCommentListByImage(
    @Param(`image_id`) image_id: number,
    @Req() req: Request,
    @Query(`page`) page?: string,
    @Query(`pageSize`) pageSize?: string,
  ) {
    return this.commentsService.findCommentListByImage(+image_id, req);
  }

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
