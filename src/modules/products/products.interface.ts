import { Product } from './products.schema';

export abstract class ProductProvider {
  create: (data: Partial<Product>) => Promise<Product>;
  update: (id: string, data: Partial<Product>) => Promise<Product>;
  delete: (id: string) => Promise<any>;
  findAll: () => Promise<Product[] | null[]>;
  findOne: (id: string) => Promise<Product | null>;
  findOneByProductName: (name: string) => Promise<Product | null>;
}
