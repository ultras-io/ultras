import type { SetState, GetState } from 'zustand/vanilla';
import { fillStateKeys, makeActionExtract } from './helpers';
import { ExtractStateAndActionType, ExtractActionType, ParamsType } from '../types/store';
import { StateKeyType } from '../types/common';

import * as crudList from '../crud/list';
import * as crudSingle from '../crud/single';
import * as crudAdd from '../crud/add';
import * as crudDelete from '../crud/delete';

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
  setStateCall: SetState<
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
  >,
  getStateCall: GetState<
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
  >
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
  const state: ExtractStateType<
    TDataList,
    TDataSingle,
    TDataCreate,
    TDataUpdate,
    TDataDelete,
    TKey
  > = {};

  // @ts-ignore
  const actions: ExtractActionType<
    TDataList,
    TDataSingle,
    TDataCreate,
    TDataUpdate,
    TDataDelete,
    TKey
  > = {};

  if (includeKeys.list) {
    const { getState, setState, interceptors } = actionExtractor<'list'>();

    crudList.buildInitialState(state);
    crudList.buildActions(actions, getState, setState, interceptors, params.limit);
  }

  if (includeKeys.single) {
    const { getState, setState, interceptors } = actionExtractor<'single'>();

    crudSingle.buildInitialState(state);
    crudSingle.buildActions(actions, getState, setState, interceptors);
  }

  if (includeKeys.add) {
    const { getState, setState, interceptors } = actionExtractor<'add'>();

    crudAdd.buildInitialState(state, interceptors.scheme);
    crudAdd.buildActions(actions, getState, setState, interceptors);
  }

  if (includeKeys.delete) {
    const { getState, setState, interceptors } = actionExtractor<'delete'>();

    crudDelete.buildInitialState(state);
    crudDelete.buildActions(actions, getState, setState, interceptors);
  }

  // @TODO: add update code

  return { ...state, ...actions };
}

export default buildStateAndActions;
