import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, UpdateQuery } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import ICrud from 'src/interfaces/crud.interface';
import { User, UserDocument } from 'src/routes/users/user.schema';

@Injectable()
export class MongooseUserService implements ICrud<UserDocument> {
  constructor(@InjectModel(User.name) private model: Model<User>) {}

  /**************************************************************************
   * CRUD METHODS************************************************************
   **************************************************************************/

  /**
   * Create a user
   * @param data user data
   * @returns created user
   */
  public async create(data: User): Promise<any> {
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
  public async findAll(): Promise<UserDocument[]> {
    return this.model.find().exec();
  }

  /**
   * Find a user by id
   * @param id user id
   * @returns user
   */
  public async findOne(id: string): Promise<UserDocument | null> {
    return this.model.findById(id).exec();
  }

  /**************************************************************************
   * CUSTOM METHODS***********************************************************
   **************************************************************************/

  /**
   * Find a user by username
   * @param username user username
   * @returns user
   */
  public async findOneByUsername(
    username: string,
  ): Promise<UserDocument | null> {
    return this.model.findOne({ username: username }).exec();
  }
}
