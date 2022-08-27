import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Coffee } from './coffee.entity';

@Entity()
@ObjectType({
  description: 'Flavor model',
})
export class Flavor {
  @PrimaryGeneratedColumn()
  @Field((type) => ID, {
    description: 'An unique identifier',
  })
  id: number;

  @Column()
  @Field((type) => String)
  name: string;

  @ManyToMany((type) => Coffee, (coffee) => coffee.flavors /* inverse side */)
  coffees: Coffee[];
}
