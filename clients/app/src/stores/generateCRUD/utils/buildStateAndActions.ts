import type { SetState, GetState } from 'zustand/vanilla';
import { fillStateKeys, makeActionExtract } from './helpers';
import { ExtractStateAndActionType, ExtractActionType, ParamsType } from '../types/store';
import { StateKeyType } from '../types/common';

import * as crudList from '../crud/list';
import * as crudSingle from '../crud/single';
import * as crudAdd from '../crud/add';

function buildInitialStateAndActions<TData, TKey extends StateKeyType, TFilter>(
  params: ParamsType<TData, TKey, TFilter>,
  setStateCall: SetState<ExtractStateAndActionType<TData, TKey, TFilter>>,
  getStateCall: GetState<ExtractStateAndActionType<TData, TKey, TFilter>>
): ExtractStateAndActionType<TData, TKey, TFilter> {
  const includeKeys = fillStateKeys(params.keys || []);

  const actionExtractor = makeActionExtract(params, setStateCall, getStateCall);

  // @ts-ignore
  const state: ExtractStateType<TData, TKey> = {};

  // @ts-ignore
  const actions: ExtractActionType<TData, TKey> = {};

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

export default buildInitialStateAndActions;
