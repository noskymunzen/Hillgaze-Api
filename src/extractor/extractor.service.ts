import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ImageAPIExtractor } from './extractor.interface';

@Injectable()
export class ExtractorService {
  private extractors: ImageAPIExtractor[];

  constructor(public readonly httpService: HttpService) {
    this.extractors = [];
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
