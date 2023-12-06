import { Module } from '@nestjs/common';
import { TeamRelationQueryResolver } from './resolver/teamRelation.query';
import { StorageModule } from '../../../storage/storage.module';

const providers = [TeamRelationQueryResolver] as const;
const imports = [StorageModule] as const;
@Module({
  imports: [...imports],
  providers: [...providers],
})
export class TeamRelationModule {}
