import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig } from 'axios';

// Who queries data from the third party api
export interface ImageAPIClient<Image, Query> {
  readonly httpService: HttpService;

  baseURL: string;

  get(params: Query, options?: AxiosRequestConfig): Promise<Image[]>;
}
