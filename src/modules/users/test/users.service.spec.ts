import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { spyOn } from 'jest-mock';
import { MongooseUsersServiceDummy } from './users.service.dummy';
import { UserMock } from './users.service.mock';
import { UserProvider } from '../user.interface';
import { ConflictException } from '@nestjs/common';

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

  describe('create', () => {
    it('should create a user', async () => {
      const testUser = UserMock[0];
      spyOn(mgUserService, 'findOneByUsername').mockImplementation(() =>
        Promise.resolve(null),
      );
      spyOn(mgUserService, 'create').mockImplementation(() =>
        Promise.resolve(testUser),
      );
      const result = await service.create(testUser);
      expect(result).toBe(testUser);
    });
    it('should throw an exception when user already exists', async () => {
      const testUser = UserMock[0];
      spyOn(mgUserService, 'findOneByUsername').mockImplementation(() =>
        Promise.resolve(testUser),
      );
      const result = service.create(testUser);
      expect(result).rejects.toThrow(ConflictException);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const testUser = UserMock[0];
      spyOn(mgUserService, 'findOne').mockImplementation(() =>
        Promise.resolve(testUser),
      );
      spyOn(mgUserService, 'update').mockImplementation(() =>
        Promise.resolve(testUser),
      );
      const result = await service.update('0', testUser);
      expect(result).toBe(testUser);
    });
    it('should throw an exception when user do not exist', async () => {
      const testUser = UserMock[0];
      spyOn(mgUserService, 'findOne').mockImplementation(() =>
        Promise.resolve(null),
      );
      const result = service.update('0', testUser);
      expect(result).rejects.toThrow(ConflictException);
    });
  });

  describe('delete', () => {
    it('should delete a user', async () => {
      const testUser = UserMock[0];
      spyOn(mgUserService, 'findOne').mockImplementation(() =>
        Promise.resolve(testUser),
      );
      spyOn(mgUserService, 'delete').mockImplementation(() =>
        Promise.resolve(testUser),
      );
      const result = await service.delete('0');
      expect(result).toBe(testUser);
    });
    it('should throw an exception when user do not exist', async () => {
      spyOn(mgUserService, 'findOne').mockImplementation(() =>
        Promise.resolve(null),
      );
      const result = service.delete('0');
      expect(result).rejects.toThrow(ConflictException);
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const testUsers = [...UserMock];
      spyOn(mgUserService, 'findAll').mockImplementation(() =>
        Promise.resolve(testUsers),
      );
      const result = await service.findAll();
      expect(result).toBe(testUsers);
    });
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      const testUser = UserMock[0];
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
      expect(result).rejects.toThrow(ConflictException);
    });
  });

  describe('findOneByUsername', () => {
    it('should return a user', async () => {
      const testUser = UserMock[0];
      spyOn(mgUserService, 'findOneByUsername').mockImplementation(() =>
        Promise.resolve(testUser),
      );
      const result = await service.findOneByUsername(testUser.username);
      expect(result).toBe(testUser);
    });
  });
});
