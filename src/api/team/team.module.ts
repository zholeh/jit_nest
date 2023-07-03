import { Module } from '@nestjs/common';
import { TeamQueryResolver } from './resolver/team.query';
import { TeamMutationResolver } from './resolver/team.mutation';
import { StorageModule } from '../../storage/storage.module';

const providers = [TeamQueryResolver, TeamMutationResolver] as const;
const imports = [StorageModule] as const;
@Module({
  imports: [...imports],
  providers: [...providers],
})
export class TeamModule {}
