import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ExtractorService } from "./extractor.service";

@Module({
  imports: [
    HttpModule,
  ],
  providers: [
    ExtractorService,
  ]
})
export class ExtractorModule {
}
