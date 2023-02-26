import { IsNotEmpty, IsPort } from 'class-validator';

export class EnvironmentDTO {
  @IsNotEmpty()
  @IsPort()
  PORT: string;

  @IsNotEmpty()
  HOSTNAME: string;

  @IsNotEmpty()
  MONGODB_URI: string;

  @IsNotEmpty()
  MONGODB_DB: string;

  @IsNotEmpty()
  WALLHAVEN_APIKEY: string;

  @IsNotEmpty()
  PEXELS_APIKEY: string;
}
