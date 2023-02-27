import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { QueryParamDto } from './dto/searh-param.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  getAll(@Query() filterDto: QueryParamDto) {
    if (Object.keys(filterDto).length) {
      return this.usersService.findByFilter(filterDto);
    }
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Get('/profile/:id')
  getProfile(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch('/profile/:id')
  updateProfile(
    @Param('id') id: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.usersService.update(id, updateProfileDto);
  }

  @Delete('/profile/:id')
  removeProfile(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
