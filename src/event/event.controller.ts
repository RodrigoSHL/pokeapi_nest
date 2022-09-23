import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { ClientTakeTimeDto } from './dto/client-take-time.dto';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Auth()
  @Post()
  create(@Body() createEventDto: CreateEventDto, @GetUser() user: User) {
    return this.eventService.create(createEventDto, user);
  }

  @Patch('/take/:id')
  takeTime(
    @Param('id') id: string,
    @Body() clientTakeTimeDto: ClientTakeTimeDto,
  ) {
    return this.eventService.takeTime(clientTakeTimeDto, id);
  }

  @Auth()
  @Get()
  findAll() {
    return this.eventService.findAll();
  }

  @Auth()
  @Get('/user')
  findAllByUser(@GetUser() user: User) {
    return this.eventService.findEventByUser(user);
  }

  @Get('/user/:id')
  findAllByUserId(@Param('id') id: string) {
    return this.eventService.findEventByUserId(id);
  }

  @Auth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(id);
  }

  @Auth()
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
    @GetUser() user: User,
  ) {
    return this.eventService.update(id, updateEventDto, user);
  }

  @Auth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(id);
  }
}
