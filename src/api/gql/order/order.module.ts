import { Module } from '@nestjs/common';
import { OrderQueryResolver } from './resolver/order.query';
import { OrderMutationResolver } from './resolver/order.mutation';
import { StorageModule } from '../../../storage/storage.module';

const providers = [OrderQueryResolver, OrderMutationResolver] as const;
const imports = [StorageModule] as const;
@Module({
  imports: [...imports],
  providers: [...providers],
})
export class OrderModule {}
