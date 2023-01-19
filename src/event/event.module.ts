import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';
import { Event, EventSchema } from './entities/event.entity';

@Module({
  controllers: [EventController],
  providers: [EventService],
  imports: [
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
    ConfigModule,
    AuthModule,
  ],
  exports: [MongooseModule],
})
export class EventModule {}
