import { Channel } from '../../schema';
import { objectToSnakeCaseKeyMap, objectToSnakeCaseValueMap } from '../helper/caseProcessing';
import { DatabaseEntity } from './entity.abstract';

const shape = Channel.shape;

export class ChannelEntity extends DatabaseEntity<typeof Channel> {
  readonly columns = {
    db: objectToSnakeCaseKeyMap(shape),
    entity: objectToSnakeCaseValueMap(shape),
  };
  readonly table = 'channel' as const;

  readonly schema = Channel;

  readonly conventionalTableName = undefined;
  readonly alias = undefined;
}
