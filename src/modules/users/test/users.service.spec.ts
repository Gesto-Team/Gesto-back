import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { spyOn } from 'jest-mock';
import { MongooseUsersServiceDummy } from './users.service.dummy';
import { Users } from './users.controller.mock';
import { UserProvider } from '../user.interface';
import { NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
  let mgUserService: UserProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersService],
      providers: [
        {
          provide: UserProvider,
          useClass: MongooseUsersServiceDummy,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    mgUserService = module.get<UserProvider>(UserProvider);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const testUsers = [...Users];
      spyOn(mgUserService, 'findAll').mockImplementation(() =>
        Promise.resolve(testUsers),
      );
      const result = await service.findAll();
      expect(result).toBe(testUsers);
    });
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      const testUser = Users[0];
      spyOn(mgUserService, 'findOne').mockImplementation(() =>
        Promise.resolve(testUser),
      );
      const result = await service.findOne('1');
      expect(result).toBe(testUser);
    });
    it('should throw an exception when no user found', async () => {
      const testUser = null;
      spyOn(mgUserService, 'findOne').mockImplementation(() =>
        Promise.resolve(testUser),
      );
      const result = service.findOne('1');
      expect(result).rejects.toThrow(NotFoundException);
    });
  });

  describe('findOneByUsername', () => {
    it('should return a user', async () => {
      const testUser = Users[0];
      spyOn(mgUserService, 'findOneByUsername').mockImplementation(() =>
        Promise.resolve(testUser),
      );
      const result = await service.findOneByUsername('username1');
      expect(result).toBe(testUser);
    });
    it('should throw an exception when no user found', async () => {
      const testUser = null;
      spyOn(mgUserService, 'findOneByUsername').mockImplementation(() =>
        Promise.resolve(testUser),
      );
      const result = service.findOneByUsername('username1');
      expect(result).rejects.toThrow(NotFoundException);
    });
  });
});
