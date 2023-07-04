import { HealthCheckController } from './healthCheck.controller';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
@Module({
  imports: [TerminusModule],
  controllers: [HealthCheckController],
  providers: [],
})
export class HealthCheckModule {}
