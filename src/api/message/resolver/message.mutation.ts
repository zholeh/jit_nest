import { Args, ID, Mutation, ObjectType, ResolveField, Resolver } from '@nestjs/graphql';
import { MessageIdType } from '../../../schema';
import { MessageCreateInput, MessageUpdateInput } from '../model/message.input';
import { MessageModel } from '../model/message.model';
import { MessageService } from '../../../storage/service/message/message.service';

@ObjectType()
export class MessageMutation {}

@Resolver(MessageMutation)
export class MessageMutationResolver {
  constructor(private readonly service: MessageService) {}

  @Mutation(() => MessageMutation)
  message(): boolean {
    return true;
  }

  @ResolveField(() => MessageModel)
  async create(@Args('input') input: MessageCreateInput): Promise<MessageModel> {
    return this.service.create({ ...input });
  }

  @ResolveField(() => MessageModel)
  async update(@Args('input') input: MessageUpdateInput): Promise<MessageModel> {
    return this.service.update(input);
  }

  @ResolveField(() => Boolean)
  async delete(@Args('id', { type: () => ID }) id: MessageIdType): Promise<boolean> {
    return this.service.delete({ id });
  }
}
