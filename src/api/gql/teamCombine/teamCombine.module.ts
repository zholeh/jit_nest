import { Module } from '@nestjs/common';
import { TeamCombineQueryResolver } from './resolver/teamCombine.query';
import { StorageModule } from '../../../storage/storage.module';

const providers = [TeamCombineQueryResolver] as const;
const imports = [StorageModule] as const;
@Module({
  imports: [...imports],
  providers: [...providers],
})
export class TeamCombineModule {}
