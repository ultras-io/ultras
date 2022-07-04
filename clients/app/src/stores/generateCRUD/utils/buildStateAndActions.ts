import type { SetState, GetState } from 'zustand/vanilla';
import { fillStateKeys, makeActionExtract } from './helpers';
import { ExtractStateAndActionType, ExtractActionType, ParamsType } from '../types/store';
import { StateKeyType } from '../types/common';

import * as crudList from '../crud/list';
import * as crudSingle from '../crud/single';
import * as crudAdd from '../crud/add';

function buildStateAndActions<
  TDataViewModel,
  TDataCreate,
  TDataUpdate,
  TKey extends StateKeyType,
  TFilter
>(
  params: ParamsType<TDataViewModel, TDataCreate, TDataUpdate, TKey, TFilter>,
  setStateCall: SetState<
    ExtractStateAndActionType<TDataViewModel, TDataCreate, TDataUpdate, TKey, TFilter>
  >,
  getStateCall: GetState<
    ExtractStateAndActionType<TDataViewModel, TDataCreate, TDataUpdate, TKey, TFilter>
  >
): ExtractStateAndActionType<TDataViewModel, TDataCreate, TDataUpdate, TKey, TFilter> {
  const includeKeys = fillStateKeys(params.keys || []);

  const actionExtractor = makeActionExtract(params, setStateCall, getStateCall);

  // @ts-ignore
  const state: ExtractStateType<TDataViewModel, TDataCreate, TDataUpdate, TKey> = {};

  // @ts-ignore
  const actions: ExtractActionType<TDataViewModel, TDataCreate, TDataUpdate, TKey> = {};

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

  // @TODO: add delete code

  // @TODO: add update code

  return { ...state, ...actions };
}

export default buildStateAndActions;
