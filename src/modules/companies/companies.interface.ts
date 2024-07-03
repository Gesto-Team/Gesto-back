import { Company } from './companies.schema';

export abstract class CompanyProvider {
  create: (data: Partial<Company>) => Promise<Company>;
  update: (id: string, data: Partial<Company>) => Promise<Company>;
  delete: (id: string) => Promise<any>;
  findAll: () => Promise<Company[] | null[]>;
  findOne: (id: string) => Promise<Company | null>;
  findOneByCompanyName: (name: string) => Promise<Company | null>;
}
