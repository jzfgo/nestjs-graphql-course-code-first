import { Query, Resolver } from '@nestjs/graphql';
import { Coffee } from '../coffees/entities/coffee.entity';
import { Drink } from '../common/interfaces/drink.interface';
import { DrinksResultUnion } from '../common/unions/drinks-result.union';
import { Tea } from '../teas/entities/tea.entity';

@Resolver()
export class DrinksResolver {
  @Query(() => [DrinksResultUnion], { name: 'drinks' })
  async findAll(): Promise<typeof DrinksResultUnion[]> {
    const coffee = new Coffee();
    coffee.id = 1;
    coffee.name = 'Colombia';
    coffee.brand = 'Black Crow Coffee';

    const tea = new Tea();
    tea.name = 'Lipton';

    return [coffee, tea];
  }
}
