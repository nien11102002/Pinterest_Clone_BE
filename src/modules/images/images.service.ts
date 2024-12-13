import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class ImagesService {
  constructor(public prisma: PrismaService) {}

  async create(createImageDto: CreateImageDto) {
    const newImage = await this.prisma.images.create({
      data: {
        user_id: createImageDto.user_id,
        name: createImageDto.name,
        url: createImageDto.url,
        description: createImageDto.description,
      },
    });

    return newImage;
  }

  async findAll(req: Request) {
    let { page, pageSize } = req.query as any;
    page = +page > 0 ? +page : 1;
    pageSize = +pageSize > 0 ? +pageSize : 3;

    const skip = (page - 1) * pageSize;
    const totalItem = await this.prisma.images.count();
    const totalPage = Math.ceil(totalItem / pageSize);

    const images = await this.prisma.images.findMany({
      skip: skip,
      take: pageSize,
      orderBy: {
        created_at: 'asc',
      },
    });

    return {
      page: page,
      pageSize: pageSize,
      totalItem: totalItem,
      totalPage: totalPage,
      items: images || [],
    };
  }

  async findOne(id: number) {
    return await this.prisma.images.findUnique({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }

  async findByName(name: string) {
    const result = await this.prisma.images.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    });

    return result;
  }
}
