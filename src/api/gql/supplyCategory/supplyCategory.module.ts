import { Module } from '@nestjs/common';
import { SupplyCategoryQueryResolver } from './resolver/supplyCategory.query';
import { SupplyCategoryMutationResolver } from './resolver/supplyCategory.mutation';
import { StorageModule } from '../../../storage/storage.module';

const providers = [SupplyCategoryQueryResolver, SupplyCategoryMutationResolver] as const;
const imports = [StorageModule] as const;
@Module({
  imports: [...imports],
  providers: [...providers],
})
export class SupplyCategoryModule {}
