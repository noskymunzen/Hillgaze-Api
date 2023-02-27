export interface PixabayConfig {
  apiKey: string;
}

export interface PixabayImage {
  id: number;
  pageURL: string;
  type: string;
  tags: string; // comma-separated values
  previewURL: string;
  previewWidth: number;
  previewHeight: number;
  webformatURL: string;
  webformatWidth: number;
  webformatHeight: number;
  largeImageURL: string;
  fullHDURL: string;
  imageURL: string;
  imageWidth: number;
  imageHeight: number;
  imageSize: number;
  views: number;
  downloads: number;
  likes: number;
  comments: number;
  user_id: number;
  user: string;
  userImageURL: string;
}

export interface PixabayQuery {
  key: string;
  q?: string;
  image_type?: 'all' | 'photo' | 'ilustration' | 'vector';
  category?:
    | 'backgrounds'
    | 'fashion'
    | 'nature'
    | 'science'
    | 'education'
    | 'feelings'
    | 'health'
    | 'people'
    | 'religion'
    | 'places'
    | 'animals'
    | 'industry'
    | 'computer'
    | 'food'
    | 'sports'
    | 'transportation'
    | 'travel'
    | 'buildings'
    | 'business'
    | 'music';
  safesearch?: 'true' | 'false';
  order?: 'popular' | 'latest';
  page?: number;
  per_page?: number;
}

export interface PixabayImageList {
  total: number;
  totalHits: number;
  hits: PixabayImage[];
}
