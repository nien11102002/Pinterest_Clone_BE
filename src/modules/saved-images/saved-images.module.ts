import { Module } from '@nestjs/common';
import { SavedImagesService } from './saved-images.service';
import { SavedImagesController } from './saved-images.controller';

@Module({
  controllers: [SavedImagesController],
  providers: [SavedImagesService],
})
export class SavedImagesModule {}
