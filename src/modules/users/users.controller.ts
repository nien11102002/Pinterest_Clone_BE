import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserInfoDto } from './dto/user-info.dto';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/common/decorators/user.decorator';
import { TUser } from 'src/common/types/types';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Put('user-info')
  async changeInfo(@Body() userInfo: UserInfoDto, @User() user: TUser) {
    return await this.usersService.changeInfo(userInfo, user);
  }

  @Get('get-info')
  async getInfo(@User() user: TUser) {
    return await this.usersService.getInfo(user);
  }
}
