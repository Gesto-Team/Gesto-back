import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from 'src/users/user.schema';
import { MyMongooseService } from '../my-mongoose.service';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MyMongooseUserService extends MyMongooseService<User> {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {
    super(userModel);
  }

  async findOneByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username: username }).exec();
  }
}
