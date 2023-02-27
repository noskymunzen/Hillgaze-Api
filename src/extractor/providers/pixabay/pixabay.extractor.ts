import { HttpService } from '@nestjs/axios';
import {
  ExtractionOptions,
  ImageAPIExtractor,
  Provider,
} from 'src/extractor/extractor.interface';
import Picture from 'src/pictures/models/picture.model';
import { PixabayClient } from './pixabay.client';
import { PixabayConfig, PixabayImage, PixabayQuery } from './pixabay.types';

export class PixabayExtractor
  implements ImageAPIExtractor<PixabayImage, PixabayQuery>
{
  client: PixabayClient;
  constructor(
    readonly httpService: HttpService,
    readonly config: PixabayConfig,
  ) {
    this.client = new PixabayClient(httpService);
  }

  async extract(options: ExtractionOptions): Promise<Picture[]> {
    // TODO: applies pagination
    const query: PixabayQuery = {
      key: this.config.apiKey,
      q: options.tags.join('+'),
      category: 'nature',
      safesearch: 'true',
      per_page: 25,
      image_type: 'photo',
    };
    if (options.latest) {
      query.order = 'latest';
    }

    const images = await this.client.get(query, {});

    return images.map((image) => this.convert(image));
  }
  convert(image: PixabayImage): Picture {
    return {
      name: image.webformatURL,
      url: image.webformatURL,
      tags: image.tags.split(', '),
      providerId: image.id.toString(),
      providerURL: image.pageURL,
      providerName: Provider.PIXABAY,
    };
  }
}
