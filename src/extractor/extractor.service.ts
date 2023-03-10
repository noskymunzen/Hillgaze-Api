import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PictureService } from 'src/pictures/pictures.service';
import { ImageAPIExtractor } from './extractor.interface';
import { PexelsExtractor } from './providers/pexels/pexels.extractor';
import { PixabayExtractor } from './providers/pixabay/pixabay.extractor';
import { WallhavenExtractor } from './providers/wallhaven/wallhaven.extractor';

@Injectable()
export class ExtractorService {
  private extractors: ImageAPIExtractor[];

  constructor(
    public readonly httpService: HttpService,
    private readonly pictureService: PictureService,
  ) {
    this.extractors = [
      new WallhavenExtractor(this.httpService, {
        apiKey: process.env.WALLHAVEN_APIKEY,
      }),
      new PexelsExtractor(this.httpService, {
        apiKey: process.env.PEXELS_APIKEY,
      }),
      new PixabayExtractor(this.httpService, {
        apiKey: process.env.PIXABAY_APIKEY,
      }),
    ];
  }

  @Cron(CronExpression.EVERY_DAY_AT_11PM)
  async extract() {
    const values = await Promise.all(
      this.extractors.map((extractor) =>
        extractor.extract({
          latest: true,
          tags: ['penguins', 'nature'],
          total: 100,
          strategy: 'group_tags',
        }),
      ),
    );
    const images = values.flat();
    const results = await this.pictureService.createBulk(images);
    console.log(`${results.length} images saved`);
  }
}
