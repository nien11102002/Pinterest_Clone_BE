import { Module } from '@nestjs/common';
import { SavedImagesService } from './saved-images.service';
import { SavedImagesController } from './saved-images.controller';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Module({
  controllers: [SavedImagesController],
  providers: [SavedImagesService, PrismaService],
})
export class SavedImagesModule {}
