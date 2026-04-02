import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: { createdAt: true, updatedAt: false }, 
})
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  name: string;

  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);