import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateProductInput {
  @Field(() => ID)
  id: number;

  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  price: number;
}
