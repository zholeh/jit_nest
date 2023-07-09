import { Module } from '@nestjs/common';
import { SupplyQueryResolver } from './resolver/supply.query';
import { SupplyMutationResolver } from './resolver/supply.mutation';
import { StorageModule } from '../../../storage/storage.module';

const providers = [SupplyQueryResolver, SupplyMutationResolver] as const;
const imports = [StorageModule] as const;
@Module({
  imports: [...imports],
  providers: [...providers],
})
export class SupplyModule {}
