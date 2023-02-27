import { Controller, Get, Query } from '@nestjs/common';
import FindPicturesDTO from './dtos/find-pictures.dto';
import { PictureList } from './pictures.interfaces';
import { PictureService } from './pictures.service';

@Controller('/pictures')
export class PictureController {
  constructor(private readonly pictureService: PictureService) {}

  @Get()
  findAllBookmarks(
    @Query() findPictureDto: FindPicturesDTO,
  ): Promise<PictureList> {
    return this.pictureService.findPictures(findPictureDto);
  }
}
