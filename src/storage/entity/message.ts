import { Message } from '../../schema/message';
import { objectToSnakeCaseKeyMap, objectToSnakeCaseValueMap } from '../helper/caseProcessing';
import { Entity } from './entity.abstract';

const messageColumnMap = objectToSnakeCaseKeyMap(Message.shape);
export const messageColumns = {
  db: objectToSnakeCaseKeyMap(Message.shape),
  entity: objectToSnakeCaseValueMap(Message.shape),
};
export const messageTable = 'message';

export class MessageEntity extends Entity<typeof Message> {
  protected columns = messageColumnMap;

  constructor(readonly schema: typeof Message) {
    super();

    this.describeField('id', {
      name: 'id',
      type: 'uuid',
      primary: true,
    });
  }
}
