import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Platform } from 'utils/enums';

export type UserDocument = Streamer & Document;

@Schema()
export class Streamer extends Document {
  @Prop({
    required: true,
    maxLength: 16,
  })
  name: string;

  @Prop({
    required: true,
    maxLength: 4000,
  })
  description: string;

  @Prop({
    select: false,
  })
  platform: Platform;

  @Prop({
    default: 'default.jpg',
  })
  image: string;

  @Prop({
    default: () => Date.now(),
  })
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const StreamerSchema = SchemaFactory.createForClass(Streamer);
