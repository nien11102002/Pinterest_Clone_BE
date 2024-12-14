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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import {
  ApiBody,
  ApiConsumes,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import cloudStorage from 'src/common/multer/upload-cloud-multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadDto } from './dto/file-upload.dto';
import { User } from 'src/common/decorators/user.decorator';
import { TUser } from 'src/common/types/types';
import { Public } from 'src/common/decorators/public.decorator';

@ApiTags('images')
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  //Post new image
  @Post()
  @UseInterceptors(FileInterceptor('image', { storage: cloudStorage }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload image with additional fields',
    schema: {
      type: 'object',
      properties: {
        image: { type: 'string', format: 'binary' },
        name: { type: 'string' },
        description: { type: 'string' },
        link: { type: 'string' },
      },
    },
  })
  async create(
    @Body() createImageDto: CreateImageDto,
    @User() user: TUser,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.imagesService.create(createImageDto, user, file);
  }

  //Get list of images
  @Public()
  @Get()
  findAll(
    @Req() req: Request,
    @Query(`page`) page?: string,
    @Query(`pageSize`) pageSize?: string,
  ) {
    return this.imagesService.findAll(req);
  }

  //Get list of images created by user_id
  @Get('created-images/:user_id')
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
  async findCreatedImagesByUserId(
    @Param(`user_id`) user_id: number,
    @User() user: TUser,
    @Req() req: Request,
    @Query(`page`) page?: string,
    @Query(`pageSize`) pageSize?: string,
  ) {
    return await this.imagesService.findCreatedImagesByUserId(
      user,
      req,
      +user_id,
    );
  }

  //Get images by search name
  @Public()
  @Get('search')
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
  async findByName(
    @Query('name') name: string,
    @Req() req: Request,
    @Query(`page`) page?: string,
    @Query(`pageSize`) pageSize?: string,
  ) {
    console.log(name);
    return await this.imagesService.findByName(name, req);
  }

  @Get(':image_id')
  findOne(@Param('image_id') image_id: number) {
    return this.imagesService.findOne(+image_id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImageDto: UpdateImageDto) {
    return this.imagesService.update(+id, updateImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: TUser) {
    return this.imagesService.remove(+id, user);
  }
}
