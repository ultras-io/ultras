import { IModel } from './types';

function createModel<T>(initialState: T): IModel<T> {
  let state: T | null = initialState;
  const subscriptions: { [key: string]: { (data: T): void }[] } = {
    INIT: [],
    UPDATE: [],
  };
  return {
    // @TODO think to change model structure and remove init step from model lifecycle
    init: () => {
      state = Object.assign({}, initialState);
      (subscriptions.INIT || []).forEach(fn => fn(initialState));
    },
    destroy: () => {
      subscriptions.INIT = [];
      subscriptions.UPDATE = [];
      state = initialState;
    },
    getState: () => Object.assign({}, state),
    setState: (stateUpdate: T) => {
      state = Object.assign(state || initialState, stateUpdate);
      (subscriptions.UPDATE || []).forEach(fn => fn(stateUpdate));
    },
    subscribe: (evt: 'INIT' | 'UPDATE', fn: (data: T) => void) => {
      subscriptions[evt].push(fn);

      return {
        unsubscribe: () => {
          subscriptions[evt].splice(subscriptions[evt].indexOf(fn) >>> 0, 1);
        },
      };
    },
  };
}

export default createModel;
