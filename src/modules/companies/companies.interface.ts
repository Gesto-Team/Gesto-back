export abstract class CompanyProvider<M> {
  create: (data: Partial<M>) => Promise<M>;
  update: (id: string, data: Partial<M>) => Promise<M>;
  delete: (id: string) => Promise<any>;
  findAll: () => Promise<M[] | null[]>;
  findOne: (id: string) => Promise<M | null>;
  findOneByCompanyName: (name: string) => Promise<M | null>;
}
