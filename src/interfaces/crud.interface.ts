import { NotFoundException } from '@nestjs/common';

export default interface ICrud<M> {
  create(data: M): Promise<M>;
  update(id: string, data: Partial<M>, error: NotFoundException): Promise<M>;
  delete(id: string, error: NotFoundException): Promise<any>;
  findAll(): Promise<M[]>;
  findOne(id: string): Promise<M>;
}
