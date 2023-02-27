import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UserSchema, User } from './users.schema';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
