import { ParseIntPipe } from '@nestjs/common';
import {
  Args,
  ID,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeInput } from './dto/create-coffee.input';
import { UpdateCoffeeInput } from './dto/update-coffee.input';
import { Coffee } from './entities/coffee.entity';

@Resolver()
export class CoffeesResolver {
  constructor(
    private readonly coffeesService: CoffeesService,
    private readonly pubSub: PubSub,
  ) {}

  @Query(() => [Coffee], { name: 'coffees' })
  async findAll() {
    return await this.coffeesService.findAll();
  }

  @Query(() => Coffee, { name: 'coffee' })
  async findOne(
    @Args(
      'id',
      {
        type: () => ID,
      },
      ParseIntPipe,
    )
    id: number,
  ) {
    return await this.coffeesService.findOne(id);
  }

  @Mutation(() => Coffee, { name: 'createCoffee' })
  async create(
    @Args('createCoffeeInput') createCoffeeInput: CreateCoffeeInput,
  ) {
    return await this.coffeesService.create(createCoffeeInput);
  }

  @Mutation(() => Coffee, { name: 'updateCoffee' })
  async update(
    @Args(
      'id',
      {
        type: () => ID,
      },
      ParseIntPipe,
    )
    id: number,
    @Args('updateCoffeeInput') updateCoffeeInput: UpdateCoffeeInput,
  ) {
    return await this.coffeesService.update(id, updateCoffeeInput);
  }

  @Mutation(() => Coffee, { name: 'removeCoffee' })
  async remove(
    @Args(
      'id',
      {
        type: () => ID,
      },
      ParseIntPipe,
    )
    id: number,
  ) {
    return await this.coffeesService.remove(id);
  }

  @Subscription(() => Coffee)
  coffeeAdded() {
    return this.pubSub.asyncIterator('coffeeAdded');
  }
}
