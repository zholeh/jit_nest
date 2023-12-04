import { MemberNotice } from '../../schema';
import { objectToSnakeCaseKeyMap, objectToSnakeCaseValueMap } from '../helper/caseProcessing';
import { DatabaseEntity } from './entity.abstract';

const shape = MemberNotice.shape;

export class MemberNoticeEntity extends DatabaseEntity<typeof MemberNotice> {
  readonly columns = {
    db: objectToSnakeCaseKeyMap(shape),
    entity: objectToSnakeCaseValueMap(shape),
  };
  readonly table = 'member_notice' as const;

  readonly schema = MemberNotice;
}
