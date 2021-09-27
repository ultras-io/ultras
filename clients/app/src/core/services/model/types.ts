export interface IModel<T> {
  init: () => void;
  destroy: () => void;
  getState: () => T;
  setState: (data: T) => void;
  subscribe: (
    evt: 'INIT' | 'UPDATE',
    fn: (data: T) => void,
  ) => {unsubscribe: () => void};
}
