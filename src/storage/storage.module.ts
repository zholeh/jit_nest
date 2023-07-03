import { Module } from '@nestjs/common';
import { DatabaseModule } from '../infrastructure/database.module';
import { UserService } from './service/user/user.service';
import { CurrencyService } from './service/currency/currency.service';
import { TeamService } from './service/team/team.service';
import { TeamMateService } from './service/teamMate/teamMate.service';
import { ChannelService } from './service/channel/channel.service';

const providers = [UserService, CurrencyService, TeamService, TeamMateService, ChannelService] as const;

@Module({
  imports: [DatabaseModule],
  providers: [...providers],
  exports: [...providers],
})
export class StorageModule {}
