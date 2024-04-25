import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MongooseUserService } from 'src/external-services/mongoose-user/mongoose-user.service';
import { HasherService } from 'src/external-services/hasher/hasher.service';

@Injectable()
export class UsersService {
  constructor(
    private hasherService: HasherService,
    private mgUserService: MongooseUserService,
  ) {}

  /**
   * Create a user
   * @param createUserDto username, password
   * @returns new user
   */
  public async create(createUserDto: CreateUserDto): Promise<any> {
    const user = await this.findOneByUsername(createUserDto.username);
    if (user) {
      throw new ConflictException(
        `${createUserDto.username} has already been taken`,
      );
    }
    return this.mgUserService.create({
      username: createUserDto.username,
      password: await this.hasherService.hash(createUserDto.password),
    });
  }

  /**
   * Find one user
   * @param id
   * @returns user
   */
  public async findOne(id: string): Promise<any> {
    const user = this.mgUserService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  /**
   * Find one user by username
   * @param username
   * @returns user
   */
  public async findOneByUsername(username: string): Promise<any> {
    return this.mgUserService.findOneByUsername(username);
  }

  /**
   * Find all users
   * @returns users
   */
  public async findAll(): Promise<any[]> {
    return this.mgUserService.findAll();
  }

  /**
   * Update a user
   * @param id
   * @param updateUserDto username, password
   * @returns updated user
   */
  public async update(id: string, updateUserDto: UpdateUserDto): Promise<any> {
    this.findOne(id);
    return this.mgUserService.update(id, updateUserDto);
  }

  /**
   * Delete a user
   * @param id
   * @returns deleted user
   */
  public async delete(id: string): Promise<any> {
    this.findOne(id);
    return this.mgUserService.delete(id);
  }
}
