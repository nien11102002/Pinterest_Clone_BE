import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { UserInfoDto } from './dto/user-info.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async changeInfo(userInfo: UserInfoDto) {
    return `Change userInfo`;
  }
}
