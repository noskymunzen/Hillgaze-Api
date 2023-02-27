import Picture from './models/picture.model';

export interface PictureList {
  page: number;
  perPage: number;
  total: number;
  items: Picture[];
}
