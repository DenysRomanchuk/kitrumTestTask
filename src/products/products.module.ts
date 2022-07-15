import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductRepository } from './repository/product.repository';
import { ProductResolver } from './resolvers/product.resolver';

@Module({
  imports: [],
  providers: [ProductsService, ProductResolver, ProductRepository],
})
export class ProductsModule {}
