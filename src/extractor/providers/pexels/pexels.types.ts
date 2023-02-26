export interface PexelsConfig {
  apiKey: string;
}

export interface PexelsImage {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  avg_color: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  liked: boolean;
  alt?: string;
}

export interface PexelsQuery {
  query?: string;
  orientation?: 'landscape' | 'portrait' | 'square';
  size?: 'large' | 'medium' | 'small';
  color?: string;
  page?: number;
  per_page?: number;
}

export interface PexelsImageList {
  total_results: number;
  page: number;
  per_page: number;
  photos: PexelsImage[];
}
