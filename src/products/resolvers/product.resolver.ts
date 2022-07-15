import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductEntity } from '../entity/product.entity';
import { CreateProductInput } from '../inputs/create-product.input';
import { Product } from '../models/product.model';
import { ProductsService } from './../products.service';

@Resolver('Product')
export class ProductResolver {
  constructor(private readonly productService: ProductsService) {}

  @Mutation(() => Product)
  async createProduct(
    @Args('createProduct') createProductInput: CreateProductInput,
  ): Promise<ProductEntity> {
    return await this.productService.createProduct({
      ...createProductInput,
    });
  }

  @Mutation(() => Number)
  async removeUser(@Args('id') id: number): Promise<number> {
    return await this.productService.removeProduct(id);
  }

  @Query(() => [Product])
  async getProducts(
    @Args('isNew') isNew: boolean,
    @Args('rangeMin') rangeMin: number,
    @Args('rangeMax') rangeMax: number,
  ) {
    return await this.productService.getProducts({ isNew, rangeMin, rangeMax });
  }
}
