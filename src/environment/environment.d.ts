declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    HOSTNAME: string;

    WALLHAVEN_APIKEY: string;
    PEXELS_APIKEY: string;
  }
}
