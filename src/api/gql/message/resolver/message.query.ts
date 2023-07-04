import { Args, Info, ObjectType, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { MessageFindAll, MessageFindOne } from '../model/message.input';
import { MessageModel } from '../model/message.model';
import { GraphQLResolveInfo } from 'graphql';
import { astFields } from '../../helper/field';
import { MessageType } from '../../../../schema';
import { MessageService } from '../../../../storage/service/message/message.service';

@ObjectType()
export class MessageQuery {}

@Resolver(MessageQuery)
export class MessageQueryResolver {
  constructor(private readonly service: MessageService) {}

  @Query(() => MessageQuery)
  message(): boolean {
    return true;
  }

  @ResolveField(() => [MessageModel])
  async findAll(
    @Info() info: GraphQLResolveInfo,
    @Args('options', { nullable: true, type: () => MessageFindAll })
    options?: MessageFindAll,
  ): Promise<readonly Partial<MessageModel>[]> {
    const fields = astFields<MessageType>(info);
    return this.service.findAll({ ...options, fields });
  }

  @ResolveField(() => MessageModel, { nullable: true })
  async findOne(
    @Info() info: GraphQLResolveInfo,
    @Args('options', { nullable: true, type: () => MessageFindOne })
    options?: MessageFindOne,
  ): Promise<Partial<MessageModel> | undefined> {
    const fields = astFields<MessageType>(info);
    return this.service.findOne({ ...options, fields });
  }
}
