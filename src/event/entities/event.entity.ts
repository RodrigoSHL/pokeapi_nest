import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as Schemas } from 'mongoose';

@Schema()
export class Event extends Document {
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
    index: true,
    ref: 'User',
  })
  user: Schemas.Types.ObjectId;
}

export const EventSchema = SchemaFactory.createForClass(Event);
