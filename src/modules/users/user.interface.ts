import { UserDocument } from './user.schema';

export abstract class UserProvider {
  create: (data: Partial<UserDocument>) => Promise<UserDocument>;
  update: (id: string, data: Partial<UserDocument>) => Promise<UserDocument>;
  delete: (id: string) => Promise<any>;
  findAll: () => Promise<UserDocument[] | null[]>;
  findOne: (id: string) => Promise<UserDocument | null>;
  findOneByUsername: (name: string) => Promise<UserDocument | null>;
}
