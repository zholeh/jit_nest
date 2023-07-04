import { Module } from '@nestjs/common';
import { MemberNoticeQueryResolver } from './resolver/memberNotice.query';
import { MemberNoticeMutationResolver } from './resolver/memberNotice.mutation';
import { StorageModule } from '../../storage/storage.module';

const providers = [MemberNoticeQueryResolver, MemberNoticeMutationResolver] as const;
const imports = [StorageModule] as const;
@Module({
  imports: [...imports],
  providers: [...providers],
})
export class MemberNoticeModule {}
