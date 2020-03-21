import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { MapperService } from '../../shared/mapper.service';
import { async } from 'rxjs/internal/scheduler/async';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly mapperService: MapperService,
  ) {}

  async get(id: number): Promise<UserDto> {
    if (!id) {
      throw new BadRequestException('id must be sent');
    }

    const user: User = await this.userRepository.findOne(id, {
      where: { status: 'active' },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return this.mapperService.map<User, UserDto>(user, new UserDto());
  }

  async getAll(): Promise<UserDto[]> {
    const user: User[] = await this.userRepository.find({
      where: { status: 'active' },
    });

    return this.mapperService.mapCollection<User, UserDto>(user, new UserDto());
  }

  async create(user: User): Promise<UserDto> {
    const savedUser: User = await this.userRepository.save(user);
    return this.mapperService.map<User, UserDto>(savedUser, new UserDto());
  }

  async update(id: number, user: User): Promise<void> {
    await this.userRepository.update(id, user);
  }

  async delete(id: number): Promise<void> {
    const userExits: User = await this.userRepository.findOne(id, {
      where: { status: 'active' },
    });

    if (!userExits) {
      throw new NotFoundException();
    }
    await this.userRepository.update(id, { status: 'inactive' });
  }
}
