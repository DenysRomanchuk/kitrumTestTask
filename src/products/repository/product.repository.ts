import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { ProductEntity } from './../entity/product.entity';
import { CreateProductInput } from './../inputs/create-product.input';

@Injectable()
export class ProductRepository {
  protected products = [
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

  private calculateId() {
    const ids = this.products.map((product) => product.id);
    return Math.max.apply(null, ids) + 1;
  }

  async save(createProductInput: CreateProductInput) {
    const newProduct: ProductEntity = {
      id: this.calculateId(),
      createdAt: moment().toISOString(),
      ...createProductInput,
    };
    return this.products[this.products.push(newProduct) - 1];
  }

  async delete(id) {
    this.products.filter((product) => product.id !== id);
    return id;
  }

  async find({}) {
    return this.products;
  }
}
