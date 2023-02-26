import { HttpService } from '@nestjs/axios';
import { ImageAPIClient } from '../providers.interfaces';
import {
  WallhavenImage,
  WallhavenImageList,
  WallhavenQuery,
} from './wallhaven.types';

export class WallhavenClient
  implements ImageAPIClient<WallhavenImage, WallhavenQuery>
{
  baseURL = 'https://wallhaven.cc/api/v1';

  constructor(readonly httpService: HttpService) {}

  async get(params: WallhavenQuery): Promise<WallhavenImage[]> {
    const urlParams = new URLSearchParams(
      params as any as Record<string, string>,
    );
    const url = `${this.baseURL}/search?${urlParams}`;
    const response = await this.httpService.axiosRef.get<WallhavenImageList>(
      url,
    );

    return response.data.data;
  }
}
