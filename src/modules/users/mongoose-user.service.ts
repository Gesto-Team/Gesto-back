import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, UpdateQuery } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { UserProvider } from './user.interface';

@Injectable()
export class MongooseUserService implements UserProvider {
  constructor(@InjectModel(User.name) private model: Model<User>) {}
  /**
   * Create a user
   * @param data user data
   * @returns created user
   */
  public async create(data: User): Promise<User> {
    return new this.model({
      ...data,
    }).save();
  }

  /**
   * Update a user
   * @param id user id
   * @param data user data
   * @returns updated user
   */
  public async update(id: string, data: UpdateQuery<User>): Promise<any> {
    return this.model.findByIdAndUpdate(id, data, {
      new: true,
    });
  }

  /**
   * Delete a user
   * @param id user id
   * @returns deleted user
   */

  public async delete(id: string): Promise<any> {
    const deletedObject = await this.model.findByIdAndDelete(id);
    if (!deletedObject) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return deletedObject;
  }

  /**
   * Find all users
   * @returns all users
   */
  public async findAll(): Promise<User[]> {
    return this.model.find().exec();
  }

  /**
   * Find a user by id
   * @param id user id
   * @returns user
   */
  public async findOne(id: string): Promise<User | null> {
    return this.model.findById(id).exec();
  }
  /**
   * Find a user by username
   * @param username user username
   * @returns user
   */
  public async findOneByUsername(username: string): Promise<User | null> {
    return this.model.findOne({ username: username }).exec();
  }
}
