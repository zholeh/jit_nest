import { Module } from '@nestjs/common';
import { UserViewLayerQueryResolver } from './resolver/userViewLayer.query';
import { UserViewLayerMutationResolver } from './resolver/userViewLayer.mutation';
import { StorageModule } from '../../../storage/storage.module';

const providers = [UserViewLayerQueryResolver, UserViewLayerMutationResolver] as const;
const imports = [StorageModule] as const;
@Module({
  imports: [...imports],
  providers: [...providers],
})
export class UserViewLayerModule {}
