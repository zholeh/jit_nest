import { FieldNode, FragmentSpreadNode, GraphQLResolveInfo, Kind, SelectionNode } from 'graphql';
import { DictionaryUnknown, EntityFields } from '../../../helper/types';
import { ServiceExceptions } from '../../../exception';

function ObjNull() {
  return Object.create(null);
}

function isNodeWithName(selection: unknown): selection is FieldNode | FragmentSpreadNode {
  if (Object.prototype.hasOwnProperty.call(selection, 'name')) return true;
  return false;
}

function ast(acc: DictionaryUnknown, selection: SelectionNode) {
  if (isNodeWithName(selection)) {
    if (selection.name.value === '__typename') return acc;
    if (selection.kind === Kind.FIELD && selection.selectionSet?.selections.length) {
      const selections = selection.selectionSet.selections.reduce(ast, ObjNull()) || {};
      acc[selection.name.value as string] = selections;
    } else {
      acc[selection.name.value as string] = true;
    }
    return acc;
  }
  throw new ServiceExceptions.UnprocessableEntity(`AST: unprocessable type of selection: ${JSON.stringify(selection)}`);
}

export function astFields<T extends DictionaryUnknown>(info: GraphQLResolveInfo): EntityFields<T> {
  const result = info.fieldNodes?.[0]?.selectionSet?.selections.reduce(ast, ObjNull()) || {};

  return result as EntityFields<T>;
}
