import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
