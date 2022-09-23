import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/auth/entities/user.entity';

@Schema()
export class Event extends mongoose.Document {
  @Prop({
    index: true,
    required: true,
  })
  title: string;

  @Prop({
    required: false,
  })
  notes: string;

  @Prop({
    required: true,
  })
  start: Date;

  @Prop({
    required: true,
  })
  end: Date;

  @Prop({
    default: false,
    required: false,
  })
  take: boolean;

  @Prop({
    required: false,
    index: true,
  })
  clientEmail: string;

  @Prop({
    required: false,
  })
  clientPhone: string;

  @Prop({
    required: false,
  })
  color: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const EventSchema = SchemaFactory.createForClass(Event);
