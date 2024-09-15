import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserProvider } from './user.interface';

@Injectable()
export class UsersService {
  constructor(private mgUserService: UserProvider) {}

  /**
   * Create a user
   * @param createUserDto username, password
   * @returns new user
   */
  public async create(createUserDto: CreateUserDto): Promise<any> {
    const user = this.findOneByUsername(createUserDto.username);
    if (await user) {
      throw new ConflictException(
        `${createUserDto.username} has already been taken`,
      );
    }
    return this.mgUserService.create(createUserDto);
  }

  /**
   * Update a user
   * @param id
   * @param updateUserDto username, password
   * @returns updated user
   */
  public async update(id: string, updateUserDto: UpdateUserDto): Promise<any> {
    const user = this.mgUserService.findOne(id);
    if (!(await user)) {
      throw new ConflictException(`User #${id} is not found`);
    }
    return this.mgUserService.update(id, updateUserDto);
  }

  /**
   * Delete a user
   * @param id
   * @returns deleted user
   */
  public async delete(id: string): Promise<any> {
    const user = this.mgUserService.findOne(id);
    if (!(await user)) {
      throw new ConflictException(`User #${id} is not found`);
    }
    return this.mgUserService.delete(id);
  }

  /**
   * Find all users
   * @returns users
   */
  public async findAll(): Promise<any[]> {
    return this.mgUserService.findAll();
  }

  /**
   * Find one user
   * @param id
   * @returns user
   */
  public async findOne(id: string): Promise<any> {
    const user = this.mgUserService.findOne(id);
    if (!(await user)) {
      throw new ConflictException(`User #${id} is not found`);
    }
    return user;
  }

  /**
   * Find one user by username
   * @param username
   * @returns user
   */
  public async findOneByUsername(username: string): Promise<any> {
    const user = this.mgUserService.findOneByUsername(username);
    return user;
  }
}
