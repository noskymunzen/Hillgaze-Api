import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExtractorModule } from './extractor/extractor.module';

@Module({
  imports: [ScheduleModule.forRoot(), ExtractorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
