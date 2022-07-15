import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { ProductEntity } from './../entity/product.entity';
import { CreateProductInput } from './../inputs/create-product.input';

@Injectable()
export class ProductRepository {
  protected products: ProductEntity[] = [
    {
      id: 1,
      price: 100,
      title: 'phone1',
      createdAt: moment().subtract(20, 'minutes').toISOString(),
    },
    {
      id: 2,
      price: 200,
      title: 'phone2',
      createdAt: moment().subtract(20, 'minutes').toISOString(),
    },
    {
      id: 3,
      price: 300,
      title: 'phone3',
      createdAt: moment().toISOString(),
    },
  ];

  private calculateId(): number {
    const ids = this.products.map((product) => product.id);
    return Math.max.apply(null, ids) + 1;
  }

  async save(createProductInput: CreateProductInput): Promise<ProductEntity> {
    const newProduct: ProductEntity = {
      id: this.calculateId(),
      createdAt: moment().toISOString(),
      ...createProductInput,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  async delete({ id }): Promise<number> {
    this.products = this.products.filter((product) => product.id !== id);
    return id;
  }

  async find({}): Promise<ProductEntity[]> {
    return this.products;
  }
}
