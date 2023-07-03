import { FieldNode, FragmentSpreadNode, GraphQLResolveInfo, SelectionNode } from 'graphql';
import { DictionaryUnknown } from '../../helper/types';
import { UnprocessableEntityServiceError } from '../../exception';

function isNodeWithName(selection: SelectionNode): selection is FieldNode | FragmentSpreadNode {
  if (Object.prototype.hasOwnProperty.call(selection, 'name')) return true;
  return false;
}

export function astFields<T extends DictionaryUnknown>(info: GraphQLResolveInfo): (keyof T)[] {
  return (
    info.fieldNodes?.[0]?.selectionSet?.selections.map((selection) => {
      if (isNodeWithName(selection)) return selection.name.value as keyof T;
      throw new UnprocessableEntityServiceError(`AST: unprocessable type of selection: ${JSON.stringify(selection)}`);
    }) || []
  );
}
