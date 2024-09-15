import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, UpdateQuery } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ProductProvider } from './products.interface';
import { Product, ProductDocument } from './products.schema';

@Injectable()
export class MongooseProductService implements ProductProvider {
  constructor(@InjectModel(Product.name) private model: Model<Product>) {}

  /**************************************************************************
   * CRUD METHODS************************************************************
   **************************************************************************/

  /**
   * Create a product
   * @param data product data
   * @returns created product
   */
  public async create(data: Product): Promise<Product> {
    const createdObject = new this.model({
      ...data,
    });
    return createdObject.save();
  }

  /**
   * Update a product
   * @param id product id
   * @param data product data
   * @returns updated product
   */
  public async update(id: string, data: UpdateQuery<Product>): Promise<any> {
    const updatedObject = await this.model.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updatedObject) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return updatedObject;
  }

  /**
   * Delete a product
   * @param id product id
   * @returns deleted product
   */
  public async delete(id: string): Promise<any> {
    const deletedObject = await this.model.findByIdAndDelete(id);
    if (!deletedObject) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return deletedObject;
  }

  /**
   * Find all products
   * @returns all products
   */
  public async findAll(): Promise<ProductDocument[]> {
    return this.model.find().exec();
  }

  /**
   * Find a product by id
   * @param id product id
   * @returns product
   */
  public async findOne(id: string): Promise<ProductDocument | null> {
    return this.model.findById(id).exec();
  }

  /**
   * Find a product by name
   * @param name product name
   * @returns product
   */
  public async findOneByProductName(
    name: string,
  ): Promise<ProductDocument | null> {
    return this.model.findOne({ name: name }).exec();
  }
}
