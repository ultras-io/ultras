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

function buildRootActions<
  TDataViewModel,
  TDataCreate,
  TDataUpdate,
  TKey extends StateKeyType,
  TFilter
>(
  params: ParamsType<TDataViewModel, TDataCreate, TDataUpdate, TKey, TFilter>,
  storeVanilla: RootStoreType<TDataViewModel, TDataCreate, TDataUpdate, TKey, TFilter>
): ExtractStateAndActionType<TDataViewModel, TDataCreate, TDataUpdate, TKey, TFilter> {
  const includeKeys = fillStateKeys(params.keys || []);

  // @ts-ignore
  const rootActions: ExtractActionType<TDataViewModel, TDataCreate, TDataUpdate, TKey> =
    {};

  if (includeKeys.list) {
    crudList.buildRootAction(
      rootActions,
      storeVanilla as RootStoreType<
        TDataViewModel,
        TDataCreate,
        TDataUpdate,
        'list',
        TFilter
      >
    );
  }

  if (includeKeys.single) {
    crudSingle.buildRootAction(
      rootActions,
      storeVanilla as RootStoreType<
        TDataViewModel,
        TDataCreate,
        TDataUpdate,
        'single',
        TFilter
      >
    );
  }

  if (includeKeys.add) {
    crudAdd.buildRootAction(
      rootActions,
      storeVanilla as RootStoreType<
        TDataViewModel,
        TDataCreate,
        TDataUpdate,
        'add',
        TFilter
      >
    );
  }

  // @TODO: add delete code

  // @TODO: add update code

  return rootActions;
}

export default buildRootActions;
