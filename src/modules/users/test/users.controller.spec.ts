import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { spyOn } from 'jest-mock';
import { MongooseUsersServiceDummy } from './users.service.dummy';
import { testUsers } from './users.controller.mock';
import { UserProvider } from '../user.interface';

describe('UsersController', () => {
  let mgUserService: UserProvider;
  let usersController: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: UserProvider,
          useClass: MongooseUsersServiceDummy,
        },
      ],
    }).compile();

    mgUserService = module.get<UserProvider>(UserProvider);
    usersController = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const result = [...testUsers];
      spyOn(mgUserService, 'findAll').mockImplementation(() =>
        Promise.resolve(result),
      );
      expect(await usersController.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      const result = testUsers[0];
      spyOn(mgUserService, 'findOne').mockImplementation(() =>
        Promise.resolve(result),
      );
      expect(await usersController.findOne('1')).toBe(result);
    });
    it('should return null', async () => {
      const result = null;
      spyOn(mgUserService, 'findOne').mockImplementation(() =>
        Promise.resolve(result),
      );
      expect(await usersController.findOne('1')).toBeNull();
    });
  });
});
