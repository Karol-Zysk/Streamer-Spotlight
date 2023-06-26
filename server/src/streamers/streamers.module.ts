import { Module } from '@nestjs/common';
import { StreamersController } from './streamers.controller';
import { StreamersService } from './streamers.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Streamer, StreamerSchema } from './entities/streamer.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Streamer.name,
        schema: StreamerSchema,
      },
    ]),
  ],
  controllers: [StreamersController],
  providers: [StreamersService],
  exports: [MongooseModule],
})
export class StreamersModule {}
