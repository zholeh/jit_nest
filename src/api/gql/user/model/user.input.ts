import { inputFromZod } from 'nestjs-graphql-zod';
import { prepareInputFromZodOptions } from '../../helper/scalar';
import { UserCreate, UserFilter, UserOrder, UserPagination, UserType, UserUpdate } from '../../../../schema/user';
import { Field, InputType } from '@nestjs/graphql';
import { FindAllOptions, FindOneOptions } from '../../../../helper/types';

@InputType()
export class UserCreateInput extends inputFromZod(UserCreate, prepareInputFromZodOptions('UserCreateInput')) {}

@InputType()
export class UserUpdateInput extends inputFromZod(UserUpdate, prepareInputFromZodOptions('UserUpdateInput')) {}

@InputType()
export class UserFilterInput extends inputFromZod(UserFilter, prepareInputFromZodOptions('UserFilterInput')) {}

@InputType()
export class UserOrderInput extends inputFromZod(UserOrder, prepareInputFromZodOptions('UserOrderInput')) {}

@InputType()
export class UserPaginationInput extends inputFromZod(
  UserPagination,
  prepareInputFromZodOptions('UserPaginationInput'),
) {}

@InputType()
export class UserFindAll implements FindAllOptions<UserType> {
  @Field(() => [UserFilterInput], { nullable: true })
  filters?: UserFilterInput[];

  @Field(() => [UserOrderInput], { nullable: true })
  orders?: UserOrderInput[];

  @Field(() => UserPaginationInput, { nullable: true })
  pagination?: UserPaginationInput;
}

@InputType()
export class UserFindOne implements FindOneOptions<UserType> {
  @Field(() => [UserFilterInput], { nullable: true })
  filters?: UserFilterInput[];
}
