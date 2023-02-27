import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PictureModule } from 'src/pictures/pictures.module';
import { ExtractorService } from './extractor.service';

@Module({
  imports: [HttpModule, PictureModule],
  providers: [ExtractorService],
})
export class ExtractorModule {}
