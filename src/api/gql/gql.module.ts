import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { configuration } from '../../infrastructure/configuration';
import { UserModule } from './user/user.module';
import { CurrencyModule } from './currency/currency.module';
import { TeamModule } from './team/team.module';
import { TeamMateModule } from './teamMate/teamMate.module';
import { ChannelModule } from './channel/channel.module';
import { MemberModule } from './member/member.module';
import { MessageModule } from './message/message.module';
import { MemberNoticeModule } from './memberNotice/memberNotice.module';
import { SupplyCategoryModule } from './supplyCategory/supplyCategory.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: configuration.params.gql.playground,
      autoSchemaFile: 'schema.gql',
    }),
    UserModule,
    CurrencyModule,
    TeamModule,
    TeamMateModule,
    ChannelModule,
    MemberModule,
    MessageModule,
    MemberNoticeModule,
    SupplyCategoryModule,
  ],
})
export class GqlModule {}
