import { Module } from '@nestjs/common';
import { MessageQueryResolver } from './resolver/message.query';
import { MessageMutationResolver } from './resolver/message.mutation';
import { StorageModule } from '../../../storage/storage.module';

const providers = [MessageQueryResolver, MessageMutationResolver] as const;
const imports = [StorageModule] as const;
@Module({
  imports: [...imports],
  providers: [...providers],
})
export class MessageModule {}
