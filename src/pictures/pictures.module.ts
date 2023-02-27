import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import Picture, { PictureSchema } from './models/picture.model';
import { PictureController } from './pictures.controller';
import { PictureService } from './pictures.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Picture.name, schema: PictureSchema }]),
  ],
  controllers: [PictureController],
  providers: [PictureService],
  exports: [PictureService],
})
export class PictureModule {}
