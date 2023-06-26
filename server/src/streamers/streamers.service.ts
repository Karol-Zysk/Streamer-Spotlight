import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Streamer, StreamerDocument } from './entities/streamer.entity';
import { CreateStreamerDto } from './dto/create-streamer.dto';

@Injectable()
export class StreamersService {
  constructor(
    @InjectModel(Streamer.name)
    private readonly streamerModel: Model<StreamerDocument>,
  ) {}

  async createStreamer(dto: CreateStreamerDto): Promise<Streamer> {
    const createdStreamer = new this.streamerModel(dto);
    return createdStreamer.save();
  }

  async findAllStreamers(): Promise<Streamer[]> {
    return this.streamerModel.find().exec();
  }

  async findStreamerById(id: string): Promise<Streamer> {
    try {
      const streamer = await this.streamerModel.findOne({ _id: id }).exec();
      if (!streamer) {
        throw new NotFoundException(`Streamer with id ${id} not found`);
      }
      return streamer;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateVotes(
    id: string,
    voteType: 'upVote' | 'downVote',
  ): Promise<Streamer> {
    const streamer = await this.streamerModel.findByIdAndUpdate(
      id,
      { $inc: { [voteType === 'upVote' ? 'upvotes' : 'downvotes']: 1 } },
      { new: true },
    );

    if (!streamer) {
      throw new Error('Streamer not found');
    }

    streamer.updatedAt = new Date();

    return streamer.save();
  }
}
