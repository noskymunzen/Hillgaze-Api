declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    HOSTNAME: string;

    MONGODB_URI: string;
    MONGODB_DB: string;

    WALLHAVEN_APIKEY: string;
    PEXELS_APIKEY: string;
  }
}
