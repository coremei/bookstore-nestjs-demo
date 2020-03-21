import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { identity } from 'rxjs';
import { UserDetail } from './user.detail.entity';
import { getConnection } from 'typeorm';
import { Role } from '../role/role.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<UserDto> {
    const user = await this.userService.get(id);
    return user;
  }

  @Get()
  async getUsers(): Promise<UserDto[]> {
    const users = await this.userService.getAll();
    return users;
  }

  @Post()
  async createUser(@Body() user: User): Promise<UserDto> {
    const details = new UserDetail();
    user.userDetails = details;

    const repo = getConnection().getRepository(Role);
    const defaulRole = await repo.findOne({
      where: {
        id: 1,
      },
    });

    user.roles = [defaulRole];

    const createdUser = await this.userService.create(user);
    return createdUser;
  }

  @Patch(':id')
  async updateUser(@Param('id', ParseIntPipe) id: number, @Body() user: User): Promise<void> {
    await this.userService.update(id, user);
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.userService.delete(id);
  }
}
