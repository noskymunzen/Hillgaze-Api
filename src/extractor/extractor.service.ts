import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ImageAPIExtractor } from './extractor.interface';
import { PexelsExtractor } from './providers/pexels/pexels.extractor';
import { WallhavenExtractor } from './providers/wallhaven/wallhaven.extractor';

@Injectable()
export class ExtractorService {
  private extractors: ImageAPIExtractor[];

  constructor(public readonly httpService: HttpService) {
    this.extractors = [
      new WallhavenExtractor(this.httpService, {
        apiKey: process.env.WALLHAVEN_APIKEY,
      }),
      new PexelsExtractor(this.httpService, {
        apiKey: process.env.PEXELS_APIKEY,
      }),
    ];
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async extract() {
    const values = await Promise.all(
      this.extractors.map((extractor) =>
        extractor.extract({
          latest: true,
          tags: ['penguins', 'nature'],
          total: 25,
          strategy: 'group_tags',
        }),
      ),
    );
    const images = values.flat();
    images.map(({ providerName, url }) => {
      console.log(url, providerName);
    });
  }
}
