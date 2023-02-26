import { ImageAPIClient } from './providers/providers.interfaces';

export enum Provider {
  PEXELS = 'PEXELS',
  WALLHAVEN = 'WALLHAVEN',
  PIXABAY = 'PIXABAY',
}

export interface Picture<T extends {} = {}> {
  _id: string;
  name: string;
  url: string;
  tags: string[];
  providerName: `${Provider}`;
  providerId: string;
  providerURL: string;
  providerMeta?: T;
}

export interface ExtractionOptions {
  total: number;
  tags: string[];
  latest: boolean;
  strategy: 'by_tags' | 'group_tags';
}

// Who extract data from a client and converts it to local format
export interface ImageAPIExtractor<Image = {}, Query = {}> {
  client: ImageAPIClient<Image, Query>;

  extract(options: ExtractionOptions): Promise<Picture[]>;

  convert(image: Image): Picture;
}
