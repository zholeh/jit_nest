import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckService, HealthIndicatorResult } from '@nestjs/terminus';
import { InjectKnex, Knex } from 'nestjs-knex';

@Controller({ path: 'health' })
@ApiTags('Health check')
export class HealthCheckController {
  constructor(private health: HealthCheckService, @InjectKnex() private readonly knex: Knex) {}

  async postgresHealthIndicator(name: string): Promise<HealthIndicatorResult> {
    try {
      await this.knex.raw('SELECT 1');
      return {
        [name]: {
          status: 'up',
        },
      };
    } catch (error) {
      return {
        [name]: {
          status: 'down',
          error,
        },
      };
    }
  }

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([() => this.postgresHealthIndicator('database')]);
  }
}
