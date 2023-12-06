import { Member } from '../../schema';
import { objectToSnakeCaseKeyMap, objectToSnakeCaseValueMap } from '../helper/caseProcessing';
import { DatabaseEntity } from './entity.abstract';

const shape = Member.shape;

export class MemberEntity extends DatabaseEntity<typeof Member> {
  readonly columns = {
    db: objectToSnakeCaseKeyMap(shape),
    entity: objectToSnakeCaseValueMap(shape),
  };
  readonly table = 'member' as const;

  readonly schema = Member;

  readonly conventionalTableName = undefined;
}
