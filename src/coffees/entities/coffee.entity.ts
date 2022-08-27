import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CoffeeType } from '../../common/enums/coffee-type.enum';
import { Drink } from '../../common/interfaces/drink.interface';
import { loggerMiddleware } from '../../common/middleware/logger.middleware';
import { Flavor } from './flavor.entity';

@Entity()
@ObjectType({
  description: 'Coffee model',
  implements: () => Drink,
})
export class Coffee implements Drink {
  @PrimaryGeneratedColumn()
  @Field(() => ID, {
    description: 'An unique identifier',
  })
  id: number;

  @Column()
  @Field(() => String, {
    middleware: [loggerMiddleware],
  })
  name: string;

  @Column()
  @Field(() => String)
  brand: string;

  @JoinTable()
  @ManyToMany((type) => Flavor, (flavor) => flavor.coffees /* inverse side */, {
    cascade: true,
  })
  @Field(() => [Flavor])
  flavors?: Flavor[];

  @CreateDateColumn()
  @Field(() => Date)
  createdAt?: Date;

  @Column({
    nullable: true,
  })
  type?: CoffeeType;
}
