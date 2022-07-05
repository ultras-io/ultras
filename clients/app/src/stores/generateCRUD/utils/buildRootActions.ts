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
import * as crudDelete from '../crud/delete';

function buildRootActions<
  TDataList,
  TDataSingle,
  TDataCreate,
  TDataUpdate,
  TDataDelete,
  TKey extends StateKeyType,
  TFilter
>(
  params: ParamsType<
    TDataList,
    TDataSingle,
    TDataCreate,
    TDataUpdate,
    TDataDelete,
    TKey,
    TFilter
  >,
  storeVanilla: RootStoreType<
    TDataList,
    TDataSingle,
    TDataCreate,
    TDataUpdate,
    TDataDelete,
    TKey,
    TFilter
  >
): ExtractStateAndActionType<
  TDataList,
  TDataSingle,
  TDataCreate,
  TDataUpdate,
  TDataDelete,
  TKey,
  TFilter
> {
  const includeKeys = fillStateKeys(params.keys || []);

  // @ts-ignore
  const rootActions: ExtractActionType<
    TDataList,
    TDataSingle,
    TDataCreate,
    TDataUpdate,
    TDataDelete,
    TKey
  > = {};

  if (includeKeys.list) {
    crudList.buildRootAction(
      rootActions,
      storeVanilla as RootStoreType<
        TDataList,
        TDataSingle,
        TDataCreate,
        TDataUpdate,
        TDataDelete,
        'list',
        TFilter
      >
    );
  }

  if (includeKeys.single) {
    crudSingle.buildRootAction(
      rootActions,
      storeVanilla as RootStoreType<
        TDataList,
        TDataSingle,
        TDataCreate,
        TDataUpdate,
        TDataDelete,
        'single',
        TFilter
      >
    );
  }

  if (includeKeys.add) {
    crudAdd.buildRootAction(
      rootActions,
      storeVanilla as RootStoreType<
        TDataList,
        TDataSingle,
        TDataCreate,
        TDataUpdate,
        TDataDelete,
        'add',
        TFilter
      >
    );
  }

  if (includeKeys.delete) {
    crudDelete.buildRootAction(
      rootActions,
      storeVanilla as RootStoreType<
        TDataList,
        TDataSingle,
        TDataCreate,
        TDataUpdate,
        TDataDelete,
        'delete',
        TFilter
      >
    );
  }

  // @TODO: add delete code

  // @TODO: add update code

  return rootActions;
}

export default buildRootActions;
