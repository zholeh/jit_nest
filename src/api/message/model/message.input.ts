import { inputFromZod } from 'nestjs-graphql-zod';
import { prepareInputFromZodOptions } from '../../helper/scalar';
import {
  MessageCreate,
  MessageFilter,
  MessageOrder,
  MessagePagination,
  MessageType,
  MessageUpdate,
} from '../../../schema/message';
import { Field, InputType } from '@nestjs/graphql';
import { FindAllOptions, FindOneOptions } from '../../../helper/types';

@InputType()
export class MessageCreateInput extends inputFromZod(MessageCreate, prepareInputFromZodOptions('MessageCreateInput')) {}

@InputType()
export class MessageUpdateInput extends inputFromZod(MessageUpdate, prepareInputFromZodOptions('MessageUpdateInput')) {}

@InputType()
export class MessageFilterInput extends inputFromZod(MessageFilter, prepareInputFromZodOptions('MessageFilterInput')) {}

@InputType()
export class MessageOrderInput extends inputFromZod(MessageOrder, prepareInputFromZodOptions('MessageOrderInput')) {}

@InputType()
export class MessagePaginationInput extends inputFromZod(
  MessagePagination,
  prepareInputFromZodOptions('MessagePaginationInput'),
) {}

@InputType()
export class MessageFindAll implements FindAllOptions<MessageType> {
  @Field(() => [MessageFilterInput], { nullable: true })
  filters?: MessageFilterInput[];

  @Field(() => [MessageOrderInput], { nullable: true })
  orders?: MessageOrderInput[];

  @Field(() => MessagePaginationInput, { nullable: true })
  pagination?: MessagePaginationInput;
}

@InputType()
export class MessageFindOne implements FindOneOptions<MessageType> {
  @Field(() => [MessageFilterInput], { nullable: true })
  filters?: MessageFilterInput[];
}
