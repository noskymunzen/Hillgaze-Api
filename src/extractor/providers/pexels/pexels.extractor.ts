import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig } from 'axios';
import { getOrientationBySize } from 'src/extractor/extractor.helpers';
import {
  ExtractionOptions,
  ImageAPIExtractor,
  Provider,
} from 'src/extractor/extractor.interface';
import { range } from 'src/helpers/array.helpers';
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
    const query: PexelsQuery = {
      query: options.tags.join(' '),
      per_page: 25,
      orientation: 'landscape',
    };
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: this.config.apiKey,
      },
    };
    const promises = [this.client.get(query, config)];
    if (options.total > 25) {
      const times = Math.ceil(options.total / 25);
      const pages = range(2, times);
      pages.forEach((page) => {
        promises.push(
          this.client.get(
            {
              ...query,
              page,
            },
            config,
          ),
        );
      });
    }
    const images = await Promise.all(promises);
    return images.flat().map((image) => this.convert(image));
  }
  convert(image: PexelsImage): Picture {
    return {
      name: image.alt || image.url,
      url: image.src.original,
      orientation: getOrientationBySize(image.width, image.height),
      tags: ['nature'], // TODO: fix
      providerId: image.id.toString(),
      providerURL: image.url,
      providerName: Provider.PEXELS,
    };
  }
}
