import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { User } from 'src/auth/entities/user.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name)
    private readonly eventModel: Model<Event>,
  ) {}

  async create(createEventDto: CreateEventDto, user: User) {
    const event = { ...createEventDto, user: user._id };
    try {
      await this.eventModel.create(event);
      return event;
    } catch (error) {
      this.handleException(error);
    }
  }

  async findAll() {
    return await this.eventModel.find();
  }

  async findEventByUserId(user: User) {
    return await this.eventModel.find({ user: { $in: user._id } });
  }

  async findOne(term: string) {
    let event: Event;
    if (!event && isValidObjectId(term)) {
      event = await this.eventModel.findById(term);
    }
    if (!event) {
      event = await this.eventModel.findOne({ title: term });
    }
    if (!event)
      throw new NotFoundException(
        `Event with id, name or no "${term}" not found`,
      );
    return event;
  }

  async update(term: string, updateEventDto: UpdateEventDto, user: User) {
    const event = await this.findOne(term);
    try {
      await event.updateOne(updateEventDto);
      return { ...event.toJSON(), ...updateEventDto };
    } catch (error) {
      this.handleException(error);
    }
  }

  async remove(term: string) {
    const { deletedCount } = await this.eventModel.deleteOne({ _id: term });
    if (deletedCount === 0) {
      throw new BadRequestException(`Event with ID ${term} not found`);
    }
    return;
  }

  private handleException(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Register with data ${JSON.stringify(error.keyValue)} exist`,
      );
    }
    throw new InternalServerErrorException(
      `Can't create Event - Check server logs`,
    );
  }
}
