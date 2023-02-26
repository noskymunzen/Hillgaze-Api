import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig } from 'axios';
import { ImageAPIClient } from '../providers.interfaces';
import { PexelsImage, PexelsImageList, PexelsQuery } from './pexels.types';

export class PexelsClient implements ImageAPIClient<PexelsImage, PexelsQuery> {
  baseURL = 'https://api.pexels.com/v1';

  constructor(readonly httpService: HttpService) {}

  async get(
    params: PexelsQuery,
    options: AxiosRequestConfig,
  ): Promise<PexelsImage[]> {
    const urlParams = new URLSearchParams(
      params as any as Record<string, string>,
    );
    const url = `${this.baseURL}/search?${urlParams}`;
    const response = await this.httpService.axiosRef.get<PexelsImageList>(
      url,
      options,
    );
    return response.data.photos;
  }
}
