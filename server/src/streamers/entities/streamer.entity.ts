import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Platform } from 'utils/enums';

export type StreamerDocument = Streamer & Document;

@Schema()
export class Streamer {
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
    required: true,
    enum: [
      Platform.Kick,
      Platform.Rumble,
      Platform.TikTok,
      Platform.Twitch,
      Platform.YouTube,
    ],
  })
  platform: Platform;

  @Prop({
    required: true,
  })
  image: string;

  @Prop({
    default: 0,
  })
  upvotes: number;

  @Prop({
    default: 0,
  })
  downvotes: number;

  @Prop({
    default: () => Date.now(),
  })
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const StreamerSchema = SchemaFactory.createForClass(Streamer);
