import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SavedImagesService } from './saved-images.service';
import { CreateSavedImageDto } from './dto/create-saved-image.dto';
import { UpdateSavedImageDto } from './dto/update-saved-image.dto';

@Controller('saved-images')
export class SavedImagesController {
  constructor(private readonly savedImagesService: SavedImagesService) {}

  @Post()
  create(@Body() createSavedImageDto: CreateSavedImageDto) {
    return this.savedImagesService.create(createSavedImageDto);
  }

  @Get()
  findAll() {
    return this.savedImagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.savedImagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSavedImageDto: UpdateSavedImageDto) {
    return this.savedImagesService.update(+id, updateSavedImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.savedImagesService.remove(+id);
  }
}
