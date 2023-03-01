import { HttpService } from '@nestjs/axios';
import {
  ExtractionOptions,
  ImageAPIExtractor,
  Provider,
} from 'src/extractor/extractor.interface';
import { range } from 'src/helpers/array.helpers';
import Picture from 'src/pictures/models/picture.model';
import { ImageAPIClient } from '../providers.interfaces';
import { WallhavenClient } from './wallhaven.client';
import {
  WallhavenConfiguration,
  WallhavenImage,
  WallhavenQuery,
} from './wallhaven.types';

export class WallhavenExtractor
  implements ImageAPIExtractor<WallhavenImage, WallhavenQuery>
{
  client: ImageAPIClient<WallhavenImage, WallhavenQuery>;
  constructor(
    readonly httpService: HttpService,
    readonly config: WallhavenConfiguration,
  ) {
    this.client = new WallhavenClient(httpService);
  }

  async extract(options: ExtractionOptions): Promise<Picture<unknown>[]> {
    // TODO: applies pagination
    const query: WallhavenQuery = {
      apiKey: this.config.apiKey,
      q: options.tags.map((tag) => `+${tag}`).join(' '),
    };
    if (options.latest) {
      query.order = 'desc';
      query.sorting = 'date_added';
    }
    const promises = [this.client.get(query)];
    if (options.total > 24) {
      const times = Math.ceil(options.total / 24);
      const pages = range(2, times);
      pages.forEach((page) => {
        promises.push(this.client.get({
          ...query,
          page,
        }));
      });
    }
    const images = await Promise.all(promises);
    return images.flat().map((image) => this.convert(image));
  }

  convert(image: WallhavenImage): Picture<unknown> {
    return {
      name: image.id,
      url: image.path,
      tags: [image.category],
      providerId: image.id,
      providerURL: image.url,
      providerName: Provider.WALLHAVEN,
    };
  }
}
