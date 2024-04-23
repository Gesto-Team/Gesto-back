import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { HasherService } from 'src/hasher/hasher.service';
import { MongooseUserService } from 'src/external-services/mongoose-user/mongoose-user.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private hasherService: HasherService,
    private mgUserService: MongooseUserService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    return this.mgUserService.create({
      username: createUserDto.username,
      password: await this.hasherService.hash(createUserDto.password),
    });
  }

  async findOne(id: string): Promise<User | null> {
    return this.mgUserService.findOne(id);
  }

  async findOneByUsername(username: string): Promise<User | null> {
    return this.mgUserService.findOneByUsername(username);
  }

  async findAll(): Promise<User[]> {
    return this.mgUserService.findAll();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.mgUserService.update(id, updateUserDto);
  }

  async remove(id: string): Promise<User> {
    return this.mgUserService.delete(id);
  }
}
