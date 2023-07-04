import { Module } from '@nestjs/common';
import { UserQueryResolver } from './resolver/user.query';
import { UserMutationResolver } from './resolver/user.mutation';
import { StorageModule } from '../../../storage/storage.module';

const providers = [UserQueryResolver, UserMutationResolver] as const;
const imports = [StorageModule] as const;
@Module({
  imports: [...imports],
  providers: [...providers],
})
export class UserModule {}
