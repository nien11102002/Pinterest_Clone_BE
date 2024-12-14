import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Request } from 'express';
import { TUser } from 'src/common/types/types';

@Injectable()
export class ImagesService {
  constructor(public prisma: PrismaService) {}

  async create(
    createImageDto: CreateImageDto,
    user: TUser,
    file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException(`File not exists`);
    const newImage = await this.prisma.images.create({
      data: {
        user_id: user.id,
        name: createImageDto.name,
        description: createImageDto.description,
        link: createImageDto.link,
        url: file.path,
      },
    });

    return newImage;
  }

  async findAll(req: Request) {
    let { page, pageSize } = req.query as any;
    page = +page > 0 ? +page : 1;
    pageSize = +pageSize > 0 ? +pageSize : 5;

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

  async findOne(image_id: number) {
    return await this.prisma.images.findUnique({
      where: {
        id: +image_id,
      },
      select: {
        id: true,
        name: true,
        url: true,
        link: true,
        description: true,
        users: true,
      },
    });
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  async remove(id: number, user: TUser) {
    const image = await this.prisma.images.findUnique({ where: { id: id } });
    if (!image) throw new BadRequestException("Image doesn't existed");

    if (image.user_id !== user.id)
      throw new ForbiddenException('You are not allowed to delete this image');

    await this.prisma.images.delete({ where: { id: id } });
    return 'Delete Successfully';
  }

  async findByName(name: string, req: Request) {
    let { page, pageSize } = req.query as any;
    page = +page > 0 ? +page : 1;
    pageSize = +pageSize > 0 ? +pageSize : 5;

    const skip = (page - 1) * pageSize;
    const totalItem = await this.prisma.images.count({
      where: {
        name: {
          contains: name,
        },
      },
    });
    const totalPage = Math.ceil(totalItem / pageSize);
    const result = await this.prisma.images.findMany({
      skip: skip,
      take: pageSize,
      orderBy: {
        created_at: 'asc',
      },
      where: {
        name: {
          contains: name,
        },
      },
    });

    return {
      page: page,
      pageSize: pageSize,
      totalItem: totalItem,
      totalPage: totalPage,
      items: result || [],
    };
  }

  async findCreatedImagesByUserId(user: TUser, req: Request, user_id: number) {
    let { page, pageSize } = req.query as any;
    page = +page > 0 ? +page : 1;
    pageSize = +pageSize > 0 ? +pageSize : 5;

    const skip = (page - 1) * pageSize;
    const totalItem = await this.prisma.images.count();
    const totalPage = Math.ceil(totalItem / pageSize);

    const images = await this.prisma.images.findMany({
      where: { user_id: user.id },
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
}
