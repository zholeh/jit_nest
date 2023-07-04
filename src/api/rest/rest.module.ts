import { Module } from '@nestjs/common';
import { HealthCheckModule } from './healthCheck/healthCheck.module';

@Module({
  imports: [HealthCheckModule],
})
export class RestModule {}
