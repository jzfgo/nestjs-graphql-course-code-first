import { Field, InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';
import { CoffeeType } from '../../common/enums/coffee-type.enum';

@InputType()
export class CreateCoffeeInput {
  @MinLength(3)
  @Field(() => String, { description: 'The name of the coffee' })
  name: string;

  @Field(() => String, { description: 'The brand of the coffee' })
  brand: string;

  @Field(() => [String], { description: 'The flavors of the coffee' })
  flavors: string[];

  @Field(() => CoffeeType, { description: 'The type of the coffee' })
  type: CoffeeType;
}
