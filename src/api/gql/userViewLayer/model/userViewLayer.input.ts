import { Field, InputType } from '@nestjs/graphql';
import { inputFromZod } from 'nestjs-graphql-zod';
import { UserIdType, UserViewLayerCreate, UserViewLayerFilter, UserViewLayerLink } from '../../../../schema';
import { prepareInputFromZodOptions } from '../../helper/scalar';

@InputType()
export class UserViewLayerCreateInput extends inputFromZod(
  UserViewLayerCreate,
  prepareInputFromZodOptions('UserViewLayerCreateInput'),
) {}

@InputType()
export class UserViewLayerLinkInput extends inputFromZod(
  UserViewLayerLink,
  prepareInputFromZodOptions('UserViewLayerLinkInput'),
) {}

@InputType()
export class UserViewLayerUserIdFilterInput {
  @Field(() => String)
  eq?: UserIdType;
}

@InputType()
export class UserViewLayerFilterInput extends inputFromZod(
  UserViewLayerFilter.omit({ userId: true }),
  prepareInputFromZodOptions('UserViewLayerFilter'),
) {
  @Field(() => UserViewLayerUserIdFilterInput)
  userId!: UserViewLayerUserIdFilterInput;
}

@InputType()
export class UserViewLayerFindAllInput {
  @Field(() => [UserViewLayerFilterInput])
  filters?: UserViewLayerFilterInput[];
}
