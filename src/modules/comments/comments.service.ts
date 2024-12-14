import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { TUser } from 'src/common/types/types';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async create(createCommentDto: CreateCommentDto, user: TUser) {
    const { comment, image_id } = createCommentDto;

    const imageExist = await this.prisma.images.findFirst({
      where: { id: image_id },
    });

    if (!imageExist) throw new BadRequestException("Image doesn't exist");

    if (!comment) throw new BadRequestException('Empty comment');

    const newComment = await this.prisma.comments.create({
      data: {
        user_id: user.id,
        image_id: image_id,
        content: comment,
        comment_date: new Date(),
      },
    });

    return newComment;
  }

  async findCommentListByImage(image_id: number, req: Request) {
    let { page, pageSize } = req.query as any;
    page = +page > 0 ? +page : 1;
    pageSize = +pageSize > 0 ? +pageSize : 5;

    const skip = (page - 1) * pageSize;
    const totalItem = await this.prisma.comments.count({
      where: {
        image_id: image_id,
      },
    });
    const totalPage = Math.ceil(totalItem / pageSize);
    const result = await this.prisma.comments.findMany({
      skip: skip,
      take: pageSize,
      orderBy: {
        created_at: 'asc',
      },
      where: {
        image_id: image_id,
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

  findAll() {
    return `This action returns all comments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
