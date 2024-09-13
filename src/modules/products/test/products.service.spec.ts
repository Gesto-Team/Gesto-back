import { Test, TestingModule } from '@nestjs/testing';
import { spyOn } from 'jest-mock';
import { ConflictException } from '@nestjs/common';
import { ProductProvider } from '../products.interface';
import { ProductService } from '../products.service';
import { MongooseProductServiceDummy } from './products.service.dummys';
import { ProductMock } from './products.service.mock';

describe('ProductService', () => {
  let service: ProductService;
  let mgProductService: ProductProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductService],
      providers: [
        {
          provide: ProductProvider,
          useClass: MongooseProductServiceDummy,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    mgProductService = module.get<ProductProvider>(ProductProvider);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a product', async () => {
      const testProduct = ProductMock[0];
      spyOn(mgProductService, 'findOneByProductName').mockImplementation(() =>
        Promise.resolve(null),
      );
      spyOn(mgProductService, 'create').mockImplementation(() =>
        Promise.resolve(testProduct),
      );
      const result = await service.create(testProduct);
      expect(result).toBe(testProduct);
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      const testProduct = ProductMock[0];
      spyOn(mgProductService, 'findOne').mockImplementation(() =>
        Promise.resolve(testProduct),
      );
      spyOn(mgProductService, 'update').mockImplementation(() =>
        Promise.resolve(testProduct),
      );
      const result = await service.update('0', testProduct);
      expect(result).toBe(testProduct);
    });
    it('should throw an exception when product do not exist', async () => {
      const testProduct = ProductMock[0];
      spyOn(mgProductService, 'findOne').mockImplementation(() =>
        Promise.resolve(null),
      );
      const result = service.update('0', testProduct);
      expect(result).rejects.toThrow(ConflictException);
    });
  });

  describe('delete', () => {
    it('should delete a product', async () => {
      const testProduct = ProductMock[0];
      spyOn(mgProductService, 'findOne').mockImplementation(() =>
        Promise.resolve(testProduct),
      );
      spyOn(mgProductService, 'delete').mockImplementation(() =>
        Promise.resolve(testProduct),
      );
      const result = await service.delete('0');
      expect(result).toBe(testProduct);
    });
    it('should throw an exception when product do not exist', async () => {
      spyOn(mgProductService, 'findOne').mockImplementation(() =>
        Promise.resolve(null),
      );
      const result = service.delete('0');
      expect(result).rejects.toThrow(ConflictException);
    });
  });

  describe('findAll', () => {
    it('should return all products', async () => {
      const testProducts = [...ProductMock];
      spyOn(mgProductService, 'findAll').mockImplementation(() =>
        Promise.resolve(testProducts),
      );
      const result = await service.findAll();
      expect(result).toBe(testProducts);
    });
  });

  describe('findOne', () => {
    it('should return a product', async () => {
      const testProduct = ProductMock[0];
      spyOn(mgProductService, 'findOne').mockImplementation(() =>
        Promise.resolve(testProduct),
      );
      const result = await service.findOne('1');
      expect(result).toBe(testProduct);
    });
    it('should throw an exception when no product found', async () => {
      const testProduct = null;
      spyOn(mgProductService, 'findOne').mockImplementation(() =>
        Promise.resolve(testProduct),
      );
      const result = service.findOne('1');
      expect(result).rejects.toThrow(ConflictException);
    });
  });

  describe('findOneByProductName', () => {
    it('should return a user', async () => {
      const testProduct = ProductMock[0];
      spyOn(mgProductService, 'findOneByProductName').mockImplementation(() =>
        Promise.resolve(testProduct),
      );
      const result = await service.findOneByProductName(testProduct.name);
      expect(result).toBe(testProduct);
    });
  });
});
