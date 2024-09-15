import { User } from './user.schema';

export abstract class UserProvider {
  create: (data: Partial<User>) => Promise<User>;
  update: (id: string, data: Partial<User>) => Promise<User>;
  delete: (id: string) => Promise<any>;
  findAll: () => Promise<User[] | null[]>;
  findOne: (id: string) => Promise<User | null>;
  findOneByUsername: (name: string) => Promise<User | null>;
}
