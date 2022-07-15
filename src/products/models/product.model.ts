import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Product {
  @Field(() => ID)
  id: number;

  @Field()
  createdAt: string;

  @Field({ nullable: true })
  price: number;

  @Field({ nullable: true })
  title: string;
}
