import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Logger, Module, OnModuleInit } from '@nestjs/common';
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
import { SupplyModule } from './supply/supply.module';
import { OrderModule } from './order/order.module';
import { UserViewLayerModule } from './userViewLayer/userViewLayer.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ExceptionsGqlInterceptor } from './common/interceptor/exception.interceptor';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: configuration.params.gql.playground,
      path: configuration.params.gql.path,
      autoSchemaFile: 'schema.gql',
      fieldResolverEnhancers: ['interceptors'],
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
    SupplyModule,
    OrderModule,
    UserViewLayerModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ExceptionsGqlInterceptor,
    },
  ],
})
export class GqlModule implements OnModuleInit {
  logger = new Logger('GQL');

  onModuleInit() {
    this.logger.log(
      `Graphql was started on: http://${configuration.params.application.host}:${configuration.params.application.port}/${configuration.params.gql.path}`,
    );
  }
}
