import { Prop } from '@nestjs/mongoose';
import { Schema } from 'mongoose';

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
  })
  take: boolean;

  @Prop({
    unique: true,
    index: true,
    ref: 'User',
  })
  user: Schema.Types.ObjectId;
}
