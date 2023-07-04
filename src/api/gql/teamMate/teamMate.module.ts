import { Module } from '@nestjs/common';
import { TeamMateQueryResolver } from './resolver/teamMate.query';
import { TeamMateMutationResolver } from './resolver/teamMate.mutation';
import { StorageModule } from '../../../storage/storage.module';

const providers = [TeamMateQueryResolver, TeamMateMutationResolver] as const;
const imports = [StorageModule] as const;
@Module({
  imports: [...imports],
  providers: [...providers],
})
export class TeamMateModule {}
