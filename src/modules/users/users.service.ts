import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { UserInfoDto } from './dto/user-info.dto';
import { TUser } from 'src/common/types/types';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async changeInfo(userInfo: UserInfoDto, user: TUser) {
    const { avatar, display_name, full_name, web_link, introduction } =
      userInfo;
    const updatedUser = await this.prisma.users.update({
      where: { id: user.id },
      data: {
        avatar: avatar ? avatar : user.avatar,
        display_name: display_name ? display_name : user.display_name,
        full_name: full_name ? full_name : user.full_name,
        web_link: web_link ? web_link : user.web_link,
        introduction: introduction ? introduction : user.introduction,
      },
      select: {
        id: true,
        full_name: true,
        age: true,
        avatar: true,
        display_name: true,
        introduction: true,
        web_link: true,
      },
    });

    return updatedUser;
  }

  async getInfo(user: TUser) {
    return user;
  }
}
