import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreateSavedImageDto } from './dto/create-saved-image.dto';
import { UpdateSavedImageDto } from './dto/update-saved-image.dto';

import { TUser } from 'src/common/types/types';
import { Request } from 'express';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class SavedImagesService {
  constructor(private prisma: PrismaService) {}

  async create(user: TUser, image_id: number) {
    const user_id = user.id;
    const savedImage = await this.prisma.saved_images.findFirst({
      where: {
        user_id: user_id,
        image_id: +image_id,
      },
    });

    if (savedImage)
      throw new ConflictException(`Already save the image ${image_id}`);

    const newSavedImage = await this.prisma.saved_images.create({
      data: { user_id, image_id: +image_id, save_date: new Date() },
    });
    return newSavedImage;
  }

  async findAll(user: TUser, user_id: number, req: Request) {
    let { page, pageSize } = req.query as any;
    page = +page > 0 ? +page : 1;
    pageSize = +pageSize > 0 ? +pageSize : 5;

    const skip = (page - 1) * pageSize;
    const totalItem = await this.prisma.saved_images.count();
    const totalPage = Math.ceil(totalItem / pageSize);

    const saved_images = await this.prisma.saved_images.findMany({
      where: { user_id: +user_id },
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
      items: saved_images || [],
    };
  }

  async isSavedImage(user: TUser, image_id: number) {
    const imageExist = await this.prisma.saved_images.findFirst({
      where: { image_id: +image_id },
    });
    if (!imageExist) throw new BadRequestException("Image doesn't exist");

    const isSaved = await this.prisma.saved_images.findFirst({
      where: {
        image_id: +image_id,
        user_id: user.id,
      },
    });
    return { isSaved };
  }

  findOne(id: number) {
    return `This action returns a #${id} savedImage`;
  }

  update(id: number, updateSavedImageDto: UpdateSavedImageDto) {
    return `This action updates a #${id} savedImage`;
  }

  async remove(user: TUser, image_id: number) {
    const user_id = user.id;
    const savedImage = await this.prisma.saved_images.findFirst({
      where: {
        user_id: user_id,
        image_id: +image_id,
      },
    });

    if (!savedImage)
      throw new ConflictException(`The image ${image_id} has not been saved`);

    await this.prisma.saved_images.delete({
      where: {
        user_id_image_id: { user_id, image_id },
      },
    });
    return `Remove saved_image successfully`;
  }
}
