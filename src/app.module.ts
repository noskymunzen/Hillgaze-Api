import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvironmentModule } from './environment/environment.module';
import { ExtractorModule } from './extractor/extractor.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    EnvironmentModule,
    ScheduleModule.forRoot(),
    ExtractorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
