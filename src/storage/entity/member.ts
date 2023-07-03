import { Member } from '../../schema/member';
import { objectToSnakeCaseKeyMap, objectToSnakeCaseValueMap } from '../helper/caseProcessing';
import { Entity } from './entity.abstract';

const memberColumnMap = objectToSnakeCaseKeyMap(Member.shape);
export const memberColumns = {
  db: objectToSnakeCaseKeyMap(Member.shape),
  entity: objectToSnakeCaseValueMap(Member.shape),
};
export const memberTable = 'member';

export class MemberEntity extends Entity<typeof Member> {
  protected columns = memberColumnMap;

  constructor(readonly schema: typeof Member) {
    super();

    this.describeField('id', {
      name: 'id',
      type: 'uuid',
      primary: true,
    });
  }
}
