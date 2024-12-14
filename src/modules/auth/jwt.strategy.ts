import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { TUser } from 'src/common/types/types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, `protect`) {
  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('ACCESS_TOKEN_SECRET'),
    });
  }

  async validate(payload: any) {
    const user: TUser = await this.prisma.users.findUnique({
      where: { id: Number(payload.user_id) },
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
    return user;
  }
}
