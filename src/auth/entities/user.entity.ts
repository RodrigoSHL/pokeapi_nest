import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class User extends Document {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    unique: true,
    index: true,
    required: true,
  })
  email: string;

  @Prop({
    index: true,
    required: true,
  })
  password: string;

  @Prop({
    index: true,
    required: false,
    default: true,
  })
  isActive: boolean;

  @Prop({
    index: true,
    required: false,
    default: ['user'],
  })
  roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
