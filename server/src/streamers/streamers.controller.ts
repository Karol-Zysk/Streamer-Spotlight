import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateStreamerDto } from './dto/create-streamer.dto';
import { Streamer } from './entities/streamer.entity';
import { StreamersService } from './streamers.service';

@Controller('streamers')
export class StreamersController {
  constructor(private readonly streamerService: StreamersService) {}

  @Post()
  async createStreamer(@Body() dto: CreateStreamerDto): Promise<Streamer> {
    return this.streamerService.createStreamer(dto);
  }

  @Get()
  async findAllStreamers(): Promise<Streamer[]> {
    return this.streamerService.findAllStreamers();
  }

  @Get(':id')
  async findStreamerById(@Param('id') id: string): Promise<Streamer> {
    return this.streamerService.findStreamerById(id);
  }

  @Put(':id/vote')
  async updateVotes(
    @Param('id') id: string,
    @Body('voteType') voteType: 'upVote' | 'downVote',
  ): Promise<Streamer> {
    return this.streamerService.updateVotes(id, voteType);
  }
}
