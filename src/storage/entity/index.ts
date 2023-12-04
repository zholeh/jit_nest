import { CalendarEntity } from './calendar.entity';
import { ChannelEntity } from './channel.entity';
import { CurrencyEntity } from './currency.entity';
import { MemberEntity } from './member';
import { MemberNoticeEntity } from './memberNotice';
import { MessageEntity } from './message';
import { OrderEntity } from './order.entity';
import { SupplyEntity } from './supply.entity';
import { SupplyCategoryEntity } from './supplyCategory.entity';
import { TeamEntity } from './team.entity';
import { TeamMateEntity } from './teamMate.entity';
import { UserEntity } from './user.entity';
import { UserLayerEntity } from './userViewLayer.entity';

export const calendarEntity = new CalendarEntity();
export const channelEntity = new ChannelEntity();
export const currencyEntity = new CurrencyEntity();
export const memberEntity = new MemberEntity();
export const memberNoticeEntity = new MemberNoticeEntity();
export const messageEntity = new MessageEntity();
export const orderEntity = new OrderEntity();
export const supplyEntity = new SupplyEntity();
export const supplyCategoryEntity = new SupplyCategoryEntity();
export const teamEntity = new TeamEntity();
export const teamMateEntity = new TeamMateEntity();
export const userEntity = new UserEntity();
export const userLayerEntity = new UserLayerEntity();