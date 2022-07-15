import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { ProductEntity } from './entity/product.entity';
import { CreateProductInput } from './inputs/create-product.input';
import { DeleteProductInput } from './inputs/delete-product.input';
import { ProductRepository } from './repository/product.repository';
import { ProductFilterType } from './types/product.type';

@Injectable()
export class ProductsService {
  constructor(private readonly productRepository: ProductRepository) {}

  protected checkDate({ createdAt }): boolean {
    const now = moment().subtract(15, 'minutes');
    const product_date = moment(createdAt);
    return now < product_date;
  }

  private filteredProduct(
    products: ProductEntity[],
    options: ProductFilterType,
  ): ProductEntity[] {
    const { rangeMin, rangeMax, isNew } = options;
    return products
      .filter(
        (product) =>
          product['price'] >= rangeMin && product['price'] <= rangeMax,
      )
      .filter((product) =>
        isNew ? this.checkDate({ createdAt: product.createdAt }) : true,
      );
  }

  async createProduct(
    createProductInput: CreateProductInput,
  ): Promise<ProductEntity> {
    return this.productRepository.save({
      ...createProductInput,
    });
  }

  async removeProduct(id: DeleteProductInput): Promise<number> {
    return this.productRepository.delete(id);
  }

  async getProducts(options: ProductFilterType): Promise<ProductEntity[]> {
    const products = await this.productRepository.find({});
    return this.filteredProduct(products, {
      ...(options as ProductFilterType),
    });
  }
}
