import { Test, TestingModule } from '@nestjs/testing';
import { spyOn } from 'jest-mock';
import { ConflictException } from '@nestjs/common';
import { CompanyProvider } from '../companies.interface';
import { CompaniesService } from '../companies.service';
import { MongooseCompaniesServiceDummy } from './companies.service.dummys';
import { CompanyMock } from './companies.service.mock';
import { MailerProvider } from '../mailer/mailer.interface';
import { CompanyDocument } from '../companies.schema';
import { NodeMailerServiceDummy } from '../mailer/test/nodemailer.service.dummy';

describe('CompaniesService', () => {
  let service: CompaniesService;
  let mgCompanyService: CompanyProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompaniesService],
      providers: [
        {
          provide: CompanyProvider,
          useClass: MongooseCompaniesServiceDummy,
        },
        {
          provide: MailerProvider<CompanyDocument>,
          useClass: NodeMailerServiceDummy,
        },
      ],
    }).compile();

    service = module.get<CompaniesService>(CompaniesService);
    mgCompanyService = module.get<CompanyProvider>(CompanyProvider);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a company', async () => {
      const testCompany = CompanyMock[0];
      spyOn(mgCompanyService, 'findOneByCompanyName').mockImplementation(() =>
        Promise.resolve(null),
      );
      spyOn(mgCompanyService, 'create').mockImplementation(() =>
        Promise.resolve(testCompany),
      );
      const result = await service.create(testCompany);
      expect(result).toBe(testCompany);
    });
    it('should throw an exception when company already exists', async () => {
      const testCompany = CompanyMock[0];
      spyOn(mgCompanyService, 'findOneByCompanyName').mockImplementation(() =>
        Promise.resolve(testCompany),
      );
      const result = service.create(testCompany);
      expect(result).rejects.toThrow(ConflictException);
    });
  });

  describe('update', () => {
    it('should update a company', async () => {
      const testCompany = CompanyMock[0];
      spyOn(mgCompanyService, 'findOne').mockImplementation(() =>
        Promise.resolve(testCompany),
      );
      spyOn(mgCompanyService, 'update').mockImplementation(() =>
        Promise.resolve(testCompany),
      );
      const result = await service.update('0', testCompany);
      expect(result).toBe(testCompany);
    });
    it('should throw an exception when company do not exist', async () => {
      const testCompany = CompanyMock[0];
      spyOn(mgCompanyService, 'findOne').mockImplementation(() =>
        Promise.resolve(null),
      );
      const result = service.update('0', testCompany);
      expect(result).rejects.toThrow(ConflictException);
    });
  });

  describe('delete', () => {
    it('should delete a company', async () => {
      const testCompany = CompanyMock[0];
      spyOn(mgCompanyService, 'findOne').mockImplementation(() =>
        Promise.resolve(testCompany),
      );
      spyOn(mgCompanyService, 'delete').mockImplementation(() =>
        Promise.resolve(testCompany),
      );
      const result = await service.delete('0');
      expect(result).toBe(testCompany);
    });
    it('should throw an exception when company do not exist', async () => {
      spyOn(mgCompanyService, 'findOne').mockImplementation(() =>
        Promise.resolve(null),
      );
      const result = service.delete('0');
      expect(result).rejects.toThrow(ConflictException);
    });
  });

  describe('findAll', () => {
    it('should return all companys', async () => {
      const testCompanies = [...CompanyMock];
      spyOn(mgCompanyService, 'findAll').mockImplementation(() =>
        Promise.resolve(testCompanies),
      );
      const result = await service.findAll();
      expect(result).toBe(testCompanies);
    });
  });

  describe('findOne', () => {
    it('should return a company', async () => {
      const testCompany = CompanyMock[0];
      spyOn(mgCompanyService, 'findOne').mockImplementation(() =>
        Promise.resolve(testCompany),
      );
      const result = await service.findOne('1');
      expect(result).toBe(testCompany);
    });
    it('should throw an exception when no company found', async () => {
      const testCompany = null;
      spyOn(mgCompanyService, 'findOne').mockImplementation(() =>
        Promise.resolve(testCompany),
      );
      const result = service.findOne('1');
      expect(result).rejects.toThrow(ConflictException);
    });
  });
});
