import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field({ nullable: true })
  title: string;

  @Field()
  price: number;
}
