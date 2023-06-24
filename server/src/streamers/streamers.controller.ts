import { Controller, Get } from '@nestjs/common';

@Controller('streamers')
export class StreamersController {
  @Get()
  async hello() {
    return 'elo elo';
  }
 
  @Get()
  async createStreamer() {
    return 'elo elo';
  }
}
