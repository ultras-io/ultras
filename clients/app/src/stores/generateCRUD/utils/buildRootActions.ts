import {
  ExtractStateAndActionType,
  RootStoreType,
  ExtractActionType,
  ParamsType,
} from '../types/store';
import { StateKeyType } from '../types/common';

import { fillStateKeys } from './helpers';
import * as crudList from '../crud/list';
import * as crudSingle from '../crud/single';
import * as crudAdd from '../crud/add';

function buildInitialStateAndActions<TData, TKey extends StateKeyType, TFilter>(
  params: ParamsType<TData, TKey, TFilter>,
  storeVanilla: RootStoreType<TData, TKey, TFilter>
): ExtractStateAndActionType<TData, TKey, TFilter> {
  const includeKeys = fillStateKeys(params.keys || []);

  // @ts-ignore
  const rootActions: ExtractActionType<TData, TKey> = {};

  if (includeKeys.list) {
    crudList.buildRootAction(
      rootActions,
      storeVanilla as RootStoreType<TData, 'list', TFilter>
    );
  }

  if (includeKeys.single) {
    crudSingle.buildRootAction(
      rootActions,
      storeVanilla as RootStoreType<TData, 'single', TFilter>
    );
  }

  if (includeKeys.add) {
    crudAdd.buildRootAction(
      rootActions,
      storeVanilla as RootStoreType<TData, 'add', TFilter>
    );
  }

  // @TODO: add delete code

  // @TODO: add update code

  return rootActions;
}

export default buildInitialStateAndActions;
