export interface WallhavenConfiguration {
  apiKey: string;
}

export interface WallhavenImage {
  id: string;
  url: string;
  short_url: string;
  views: number;
  favorites: number;
  source: string;
  purity: string;
  category: 'anime' | 'general' | 'people';
  dimension_x: number;
  dimension_y: number;
  resolution: string;
  ratio: number;
  created_at: string;
  path: string;
}

export interface WallhavenQuery {
  q?: string; // tagname | +tag1 +tag2 | -tag1 -tag2 | type:{png/jpg}
  sorting?:
    | 'date_added'
    | 'relevance'
    | 'random'
    | 'views'
    | 'favorites'
    | 'toplist';
  order?: 'desc' | 'asc';
  page?: number; // limit in 24
  apiKey: string;
}

export interface WallhavenImageList {
  data: WallhavenImage[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}
