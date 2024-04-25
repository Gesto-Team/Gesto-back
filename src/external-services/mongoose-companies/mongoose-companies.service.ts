import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, UpdateQuery } from 'mongoose';
import { Company } from 'src/companies/companies.schema';
import { InjectModel } from '@nestjs/mongoose';
import ICrud from 'src/interfaces/crud.interface';

@Injectable()
export class MongooseCompanyService implements ICrud<Company> {
  constructor(@InjectModel(Company.name) private model: Model<Company>) {}

  // CRUD METHODS

  /**
   *
   *
   * Create a document
   * @param data document data
   * @returns created document
   */
  async create(data: Company): Promise<any> {
    const createdObject = new this.model({
      ...data,
    });
    return createdObject.save();
  }

  /**
   * Update a document
   * @param id document id
   * @param data document data
   * @returns updated document
   */
  async update(id: string, data: UpdateQuery<Company>): Promise<any> {
    const updatedObject = await this.model.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updatedObject) {
      throw new NotFoundException(`Company #${id} not found`);
    }
    return updatedObject;
  }

  /**
   * Delete a document
   * @param id document id
   * @returns deleted document
   */

  async delete(id: string): Promise<any> {
    const deletedObject = await this.model.findByIdAndDelete(id);
    if (!deletedObject) {
      throw new NotFoundException(`Company #${id} not found`);
    }
    return deletedObject;
  }

  /**
   * Find all documents
   * @returns all documents
   */
  async findAll(): Promise<any[]> {
    return this.model.find().exec();
  }

  /**
   * Find a document by id
   * @param id document id
   * @returns document
   */
  async findOne(id: string): Promise<any> {
    return this.model.findById(id).exec();
  }

  // CUSTOM METHODS

  async findOneByCompanyName(name: string): Promise<Company | null> {
    return this.model.findOne({ name: name }).exec();
  }
}
