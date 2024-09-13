import { ConflictException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './products.schema';
import { ProductProvider } from './products.interface';

@Injectable()
export class ProductService {
  constructor(private mgProductService: ProductProvider) {}

  /**
   * Create a new product
   * @param createProductDto product data
   * @returns new product
   */
  public async create(createProductDto: CreateProductDto): Promise<any> {
    return this.mgProductService.create({
      name: createProductDto.name,
      price: createProductDto.price,
      unit: createProductDto.unit,
      expirationDate: createProductDto.expirationDate,
      quantity: createProductDto.quantity,
    });
  }

  /**
   * Update a product
   * @param id
   * @param updateProductDto product data
   * @returns updated product
   */
  public async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = this.mgProductService.findOne(id);
    if (!(await product)) {
      throw new ConflictException(`Product #${id} is not found`);
    }
    return this.mgProductService.update(id, updateProductDto);
  }

  /**
   * Remove a product
   * @param id
   * @returns removed product
   */
  public async delete(id: string): Promise<Product> {
    const product = this.mgProductService.findOne(id);
    if (!(await product)) {
      throw new ConflictException(`Product #${id} is not found`);
    }
    return this.mgProductService.delete(id);
  }

  /**
   * Find all products
   * @returns products
   */
  public async findAll(): Promise<any[]> {
    return this.mgProductService.findAll();
  }

  /**
   * Find one product
   * @param id
   * @returns product
   */
  public async findOne(id: string): Promise<any> {
    const product = this.mgProductService.findOne(id);
    if (!(await product)) {
      throw new ConflictException(`Product #${id} is not found`);
    }
    return product;
  }

  /**
   * Find one product by name
   * @param name
   * @returns product
   */
  public async findOneByProductName(name: string): Promise<any> {
    return this.mgProductService.findOneByProductName(name);
  }
}
