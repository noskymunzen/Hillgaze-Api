import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig } from 'axios';
import { ImageAPIClient } from '../providers.interfaces';
import { PixabayImage, PixabayImageList, PixabayQuery } from './pixabay.types';

export class PixabayClient
  implements ImageAPIClient<PixabayImage, PixabayQuery>
{
  baseURL = 'https://pixabay.com/api/';

  constructor(readonly httpService: HttpService) {}

  async get(
    params: PixabayQuery,
    options: AxiosRequestConfig,
  ): Promise<PixabayImage[]> {
    const urlParams = new URLSearchParams(
      params as any as Record<string, string>,
    );
    const url = `${this.baseURL}/?${urlParams}`;
    const response = await this.httpService.axiosRef.get<PixabayImageList>(
      url,
      options,
    );
    return response.data.hits;
  }
}
