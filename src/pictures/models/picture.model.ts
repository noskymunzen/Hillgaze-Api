import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  IsArray,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { Document, Types } from 'mongoose';
import { Provider } from 'src/extractor/extractor.interface';

@Schema({ timestamps: { createdAt: true } })
export default class Picture<T extends {} = {}> {
  @Prop({ type: Types.ObjectId })
  @IsMongoId()
  _id?: Types.ObjectId;

  @Prop({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  name: string;

  @Prop({ type: String, requeried: true })
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  url: string;

  @Prop({ type: [String], required: false })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  tags: string[];

  @Prop({ enum: Provider, required: true })
  @IsEnum(Provider)
  providerName: `${Provider}`;

  @Prop({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  providerId: string;

  @Prop({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  providerURL: string;

  @Prop({ type: Object })
  @IsOptional()
  @IsObject()
  providerMeta?: T;
}

const PictureSchema = SchemaFactory.createForClass(Picture);
PictureSchema.index({ providerName: 1, providerId: 1 }, { unique: true });

export { PictureSchema };
export type PictureDocument = Picture & Document;
