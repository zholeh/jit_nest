import { FieldNode, FragmentSpreadNode, GraphQLResolveInfo, SelectionNode } from 'graphql';
import { DictionaryUnknown } from '../../../helper/types';
import { ServiceExceptions } from '../../../exception';

function isNodeWithName(selection: SelectionNode): selection is FieldNode | FragmentSpreadNode {
  if (Object.prototype.hasOwnProperty.call(selection, 'name')) return true;
  return false;
}

export function astFields<T extends DictionaryUnknown>(info: GraphQLResolveInfo): (keyof T)[] {
  return (
    info.fieldNodes?.[0]?.selectionSet?.selections.reduce<(keyof T)[]>((acc, selection) => {
      if (isNodeWithName(selection)) {
        if (selection.name.value !== '__typename') acc.push(selection.name.value as keyof T);

        return acc;
      }
      throw new ServiceExceptions.UnprocessableEntity(
        `AST: unprocessable type of selection: ${JSON.stringify(selection)}`,
      );
    }, []) || []
  );
}
