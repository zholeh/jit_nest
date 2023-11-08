import { MemberNotice } from '../../schema';
import { objectToSnakeCaseKeyMap, objectToSnakeCaseValueMap } from '../helper/caseProcessing';
import { Entity } from './entity.abstract';

const memberNoticeColumnMap = objectToSnakeCaseKeyMap(MemberNotice.shape);
export const memberNoticeColumns = {
  db: objectToSnakeCaseKeyMap(MemberNotice.shape),
  entity: objectToSnakeCaseValueMap(MemberNotice.shape),
};
export const memberNoticeTable = 'member_notice';

export class MemberNoticeEntity extends Entity<typeof MemberNotice> {
  protected columns = memberNoticeColumnMap;

  constructor(readonly schema: typeof MemberNotice) {
    super();

    this.describeField('id', {
      name: 'id',
      type: 'uuid',
      primary: true,
    });
  }
}
