# Hillgaze Api

Hillgaze Api provides you daily extracted images from third-party APIs from a single API.

Made using:

- NestJs
- Mongoose
- Axios
- Third-party APIs

## 🐝 Features

- [x] Image extraction based on third party APIs
- [x] Nature-focused images
- [x] Easy to extend extraction system (Adapter Pattern)
- [x] Cron based scheduled extraction
- [x] Image searching

## 🗺️ Roadmap

- [ ] App development
- [ ] Extraction strategies
- [ ] Backup images on S3
- [ ] Save metadata by image according to provider
- [ ] Image search filters
- [ ] Swagger integration

## ⛽️ Extractors

| Provider  | URL                            | Doc                                       |
| --------- | ------------------------------ | ----------------------------------------- |
| Pexels    | https://api.pexels.com/v1/     | https://www.pexels.com/api/documentation/ |
| Pixabay   | https://pixabay.com/api/       | https://pixabay.com/api/docs/             |
| Wallhaven | https://wallhaven.cc/api/v1/w/ | https://wallhaven.cc/help/api             |

## 🔌 Endpoints

| Use | URI       | Description                     |
| --- | --------- | ------------------------------- |
| GET | /pictures | Gets paginated list of pictures |

## 📦 Dependencies

- NodeJS v19
- NPM v8

## 📦 Installation

To install project dependencies, execute command:

```bash
$ npm install
```

Then, set required environment variables creating a `.env` file. You can just copy `.env.example` by using:

```bash
$ cp .env.example .env
```

and modifies it.

## 🖥 Execution

#### Development server

To execute development server, execute command:

```bash
$ npm run start:dev
```

#### Conventional server

To run built-in server, application pre-compiling is required. First run:

```bash
$ npm run build
```

Then just run built-in server using command:

```bash
$ npm run start:prod
```
