import { IsNotEmpty, IsPort } from 'class-validator';

export class EnvironmentDTO {
  @IsNotEmpty()
  @IsPort()
  PORT: string;

  @IsNotEmpty()
  HOSTNAME: string;

  @IsNotEmpty()
  WALLHAVEN_APIKEY: string;
}
