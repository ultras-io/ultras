import type { StoreApi } from 'zustand/vanilla';
import { fillStateKeys, makeActionExtract } from './helpers';
import { ExtractStateAndActionType, ParamsType } from '../types/store';
import { StateKeyType } from '../types/common';

import * as crudList from '../crud/list';
import * as crudSingle from '../crud/single';
import * as crudAdd from '../crud/add';
import * as crudDelete from '../crud/delete';
import * as crudUpdate from '../crud/update';
import {
  IAddGroupedState,
  IListGroupedState,
  ISingleGroupedState,
  IDeleteGroupedState,
  IUpdateGroupedState,
} from '../types';

function buildStateAndActions<
  TDataList,
  TDataSingle,
  TDataCreate,
  TDataUpdate,
  TDataDelete,
  TKey extends StateKeyType,
  TFilter,
  TScheme
>(
  params: ParamsType<
    TDataList,
    TDataSingle,
    TDataCreate,
    TDataUpdate,
    TDataDelete,
    TKey,
    TFilter,
    TScheme
  >,
  setStateCall: StoreApi<
    ExtractStateAndActionType<
      TDataList,
      TDataSingle,
      TDataCreate,
      TDataUpdate,
      TDataDelete,
      TKey,
      TFilter,
      TScheme
    >
  >['setState'],
  getStateCall: StoreApi<
    ExtractStateAndActionType<
      TDataList,
      TDataSingle,
      TDataCreate,
      TDataUpdate,
      TDataDelete,
      TKey,
      TFilter,
      TScheme
    >
  >['getState']
): ExtractStateAndActionType<
  TDataList,
  TDataSingle,
  TDataCreate,
  TDataUpdate,
  TDataDelete,
  TKey,
  TFilter,
  TScheme
> {
  const includeKeys = fillStateKeys(params.keys || []);

  const actionExtractor = makeActionExtract(params, setStateCall, getStateCall);

  // @ts-ignore
  const stateAndActions: ExtractStateAndActionType<
    TDataList,
    TDataSingle,
    TDataCreate,
    TDataUpdate,
    TDataDelete,
    TKey,
    TFilter,
    TScheme
  > = {};

  if (includeKeys.list) {
    const { getState, setState, interceptors } = actionExtractor<'list'>();

    crudList.build(
      stateAndActions as IListGroupedState<TDataList, TFilter>,
      getState,
      setState,
      interceptors,
      params.limit
    );
  }

  if (includeKeys.single) {
    const { getState, setState, interceptors } = actionExtractor<'single'>();

    crudSingle.build(
      stateAndActions as ISingleGroupedState<TDataSingle>,
      getState,
      setState,
      interceptors
    );
  }

  if (includeKeys.add) {
    const { getState, setState, interceptors } = actionExtractor<'add'>();

    crudAdd.build(
      stateAndActions as IAddGroupedState<TDataCreate, TScheme>,
      getState,
      setState,
      interceptors
    );
  }

  if (includeKeys.delete) {
    const { getState, setState, interceptors } = actionExtractor<'delete'>();

    crudDelete.buildActions(
      stateAndActions as IDeleteGroupedState<TDataDelete>,
      getState,
      setState,
      interceptors
    );
  }

  if (includeKeys.update) {
    const { getState, setState, interceptors } = actionExtractor<'update'>();

    crudUpdate.build(
      stateAndActions as IUpdateGroupedState<TDataUpdate, TScheme>,
      getState,
      setState,
      interceptors
    );
  }

  return stateAndActions;
}

export default buildStateAndActions;
