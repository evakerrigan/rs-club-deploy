import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;
export class Preference {
  @Prop()
  value: string;
  @Prop()
  category: string;
  @Prop({
    default: false,
  })
  isActive: boolean;
}
@Schema({ timestamps: true })
export class User {
  @Prop()
  githubName: string;
  @Prop()
  telegramLink?: string;
  @Prop()
  profilePicture?: string;
  @Prop()
  address?: string;
  @Prop()
  location?: [number];
  @Prop({
    default: 'user',
  })
  role: 'admin' | 'user';
  @Prop()
  signupDate: Date;
  @Prop()
  lastActivity: Date;
  @Prop({
    default: 'active',
  })
  status: 'active' | 'inactive';
  @Prop({ default: [] })
  //@Prop({ type: () => [Preference] })
  preferences: [string];
  @Prop()
  gender: 'male' | 'female';
  @Prop({ default: [] })
  technology: [string];
  @Prop({ default: [] })
  courses: [string];
}

export const UserSchema = SchemaFactory.createForClass(User);
