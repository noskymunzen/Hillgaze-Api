import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { EnvironmentModule } from './environment/environment.module';
import { ExtractorModule } from './extractor/extractor.module';
import { PictureModule } from './pictures/pictures.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    EnvironmentModule,
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      dbName: process.env.MONGODB_DB,
    }),
    PictureModule,
    ScheduleModule.forRoot(),
    ExtractorModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
