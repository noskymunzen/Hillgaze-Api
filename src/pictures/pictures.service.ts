import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import FindPicturesDTO from './dtos/find-pictures.dto';
import Picture, { PictureDocument } from './models/picture.model';
import { PictureList } from './pictures.interfaces';

@Injectable()
export class PictureService {
  constructor(
    @InjectModel(Picture.name) private pictureModel: Model<PictureDocument>,
  ) {}

  async createBulk(pictures: Picture[]) {
    return this.pictureModel.insertMany(pictures, { ordered: false });
  }

  async findPictures({
    page = 1,
    perPage = 20,
    search,
  }: FindPicturesDTO): Promise<PictureList> {
    const query: FilterQuery<Picture> = {};
    if (search) {
      query.$or = [
        {
          name: new RegExp(search, 'i'),
        },
        {
          url: new RegExp(search, 'i'),
        },
        {
          tags: new RegExp(search, 'i'),
        },
      ];
    }
    const [count, pictures] = await Promise.all([
      this.pictureModel.countDocuments().exec(),
      this.pictureModel
        .find(query)
        .limit(perPage)
        .skip((page - 1) * perPage)
        .sort({ createdAt: 'desc' })
        .exec(),
    ]);

    return {
      items: pictures,
      page,
      perPage,
      total: Math.round(Math.ceil(count / perPage)),
    };
  }
}
