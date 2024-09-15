import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, UpdateQuery } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  Company,
  CompanyDocument,
} from 'src/modules/companies/companies.schema';
import { CompanyProvider } from './companies.interface';

@Injectable()
export class MongooseCompanyService implements CompanyProvider {
  constructor(@InjectModel(Company.name) private model: Model<Company>) {}

  /**************************************************************************
   * CRUD METHODS************************************************************
   **************************************************************************/

  /**
   * Create a company
   * @param data company data
   * @returns created company
   */
  public async create(data: Company): Promise<Company> {
    const createdObject = new this.model({
      ...data,
    });
    return createdObject.save();
  }

  /**
   * Update a company
   * @param id company id
   * @param data company data
   * @returns updated company
   */
  public async update(id: string, data: UpdateQuery<Company>): Promise<any> {
    const updatedObject = await this.model.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updatedObject) {
      throw new NotFoundException(`Company #${id} not found`);
    }
    return updatedObject;
  }

  /**
   * Delete a company
   * @param id company id
   * @returns deleted company
   */
  public async delete(id: string): Promise<any> {
    const deletedObject = await this.model.findByIdAndDelete(id);
    if (!deletedObject) {
      throw new NotFoundException(`Company #${id} not found`);
    }
    return deletedObject;
  }

  /**
   * Find all companies
   * @returns all companies
   */
  public async findAll(): Promise<CompanyDocument[]> {
    return this.model.find().exec();
  }

  /**
   * Find a company by id
   * @param id company id
   * @returns company
   */
  public async findOne(id: string): Promise<CompanyDocument | null> {
    return this.model.findById(id).exec();
  }

  /**
   * Find a company by name
   * @param name company name
   * @returns company
   */
  public async findOneByCompanyName(
    name: string,
  ): Promise<CompanyDocument | null> {
    return this.model.findOne({ name: name }).exec();
  }
}
