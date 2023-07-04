import { Module } from '@nestjs/common';
import { CurrencyQueryResolver } from './resolver/currency.query';
import { CurrencyMutationResolver } from './resolver/currency.mutation';
import { StorageModule } from '../../../storage/storage.module';

const providers = [CurrencyQueryResolver, CurrencyMutationResolver] as const;
const imports = [StorageModule] as const;
@Module({
  imports: [...imports],
  providers: [...providers],
})
export class CurrencyModule {}
