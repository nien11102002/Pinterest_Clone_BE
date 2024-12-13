import { Injectable } from '@nestjs/common';
import { CreateSavedImageDto } from './dto/create-saved-image.dto';
import { UpdateSavedImageDto } from './dto/update-saved-image.dto';

@Injectable()
export class SavedImagesService {
  create(createSavedImageDto: CreateSavedImageDto) {
    return 'This action adds a new savedImage';
  }

  findAll() {
    return `This action returns all savedImages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} savedImage`;
  }

  update(id: number, updateSavedImageDto: UpdateSavedImageDto) {
    return `This action updates a #${id} savedImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} savedImage`;
  }
}
