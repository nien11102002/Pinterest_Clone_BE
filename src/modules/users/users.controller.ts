import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserInfoDto } from './dto/user-info.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Put('user-info')
  async changeInfo(@Body() userInfo: UserInfoDto) {
    return await this.usersService.changeInfo(userInfo);
  }
}
