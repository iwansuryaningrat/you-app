import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UsersDocument = Users & Document;

@Schema({
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class Users {
  @Prop({ required: true, unique: true, type: String })
  email: string;

  @Prop({ required: true, unique: true, type: String })
  username: string;

  @Prop()
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  birthday: string;

  @Prop()
  horoscope: string;

  @Prop()
  height: number;

  @Prop()
  weight: number;

  @Prop([String])
  interests: string[];
}

export const UsersSchema = SchemaFactory.createForClass(Users);
