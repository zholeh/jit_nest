import { Module } from '@nestjs/common';
import { MemberQueryResolver } from './resolver/member.query';
import { MemberMutationResolver } from './resolver/member.mutation';
import { StorageModule } from '../../../storage/storage.module';

const providers = [MemberQueryResolver, MemberMutationResolver] as const;
const imports = [StorageModule] as const;
@Module({
  imports: [...imports],
  providers: [...providers],
})
export class MemberModule {}
