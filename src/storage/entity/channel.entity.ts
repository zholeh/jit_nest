import { Channel } from '../../schema/channel';
import { objectToSnakeCaseKeyMap, objectToSnakeCaseValueMap } from '../helper/caseProcessing';
import { Entity } from './entity.abstract';

const channelColumnMap = objectToSnakeCaseKeyMap(Channel.shape);
export const channelColumns = {
  db: objectToSnakeCaseKeyMap(Channel.shape),
  entity: objectToSnakeCaseValueMap(Channel.shape),
};
export const channelTable = 'channel';

export class ChannelEntity extends Entity<typeof Channel> {
  protected columns = channelColumnMap;

  constructor(readonly schema: typeof Channel) {
    super();

    this.describeField('id', {
      name: 'id',
      type: 'uuid',
      primary: true,
    });
  }
}
