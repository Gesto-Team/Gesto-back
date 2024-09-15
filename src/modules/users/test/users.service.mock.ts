import { Role, User } from '../user.schema';

export const UserMock: User[] = [
  {
    username: 'username1',
    password: 'password1',
    role: Role.USER,
  },
  {
    username: 'username2',
    password: 'password2',
    role: Role.USER,
  },
];
