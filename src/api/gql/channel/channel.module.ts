import { Module } from '@nestjs/common';
import { ChannelQueryResolver } from './resolver/channel.query';
import { ChannelMutationResolver } from './resolver/channel.mutation';
import { StorageModule } from '../../../storage/storage.module';

const providers = [ChannelQueryResolver, ChannelMutationResolver] as const;
const imports = [StorageModule] as const;
@Module({
  imports: [...imports],
  providers: [...providers],
})
export class ChannelModule {}
