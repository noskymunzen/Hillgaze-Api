import { HttpService } from '@nestjs/axios';
import {
  ExtractionOptions,
  ImageAPIExtractor,
  Provider,
} from 'src/extractor/extractor.interface';
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
    const images = await this.client.get(query);
    return images.map((image) => this.convert(image));
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
