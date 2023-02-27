import { HttpService } from '@nestjs/axios';
import {
  ExtractionOptions,
  ImageAPIExtractor,
  Provider,
} from 'src/extractor/extractor.interface';
import Picture from 'src/pictures/models/picture.model';
import { PexelsClient } from './pexels.client';
import { PexelsConfig, PexelsImage, PexelsQuery } from './pexels.types';

export class PexelsExtractor
  implements ImageAPIExtractor<PexelsImage, PexelsQuery>
{
  client: PexelsClient;
  constructor(
    readonly httpService: HttpService,
    readonly config: PexelsConfig,
  ) {
    this.client = new PexelsClient(httpService);
  }

  async extract(options: ExtractionOptions): Promise<Picture[]> {
    // TODO: applies pagination
    const query: PexelsQuery = {
      query: options.tags.join(' '),
      per_page: 25,
      orientation: 'landscape',
    };
    const images = await this.client.get(query, {
      headers: {
        Authorization: this.config.apiKey,
      },
    });
    return images.map((image) => this.convert(image));
  }
  convert(image: PexelsImage): Picture {
    return {
      name: image.alt || image.url,
      url: image.src.original,
      tags: ['nature'], // TODO: fix
      providerId: image.id.toString(),
      providerURL: image.url,
      providerName: Provider.PEXELS,
    };
  }
}
