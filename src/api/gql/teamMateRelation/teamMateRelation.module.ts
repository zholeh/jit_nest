import { Module } from '@nestjs/common';
import { TeamMateRelationQueryResolver } from './resolver/teamMateRelation.query';
import { StorageModule } from '../../../storage/storage.module';

const providers = [TeamMateRelationQueryResolver] as const;
const imports = [StorageModule] as const;
@Module({
  imports: [...imports],
  providers: [...providers],
})
export class TeamMateRelationModule {}
