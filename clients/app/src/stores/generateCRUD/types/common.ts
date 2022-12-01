import type { ListRequestParams } from '@ultras/utils';

type AllKeys<T> = T extends any ? keyof T : never;
type PickType<T, K extends AllKeys<T>> = NonNullable<
  T extends { [key in K]: any } ? T[K] : null
>;

type PickTypeOf<T, K extends string | number | symbol> = K extends AllKeys<T>
  ? PickType<T, K>
  : PickType<T, AllKeys<T>>;

export type MergeUnion<T extends object> = {
  [keys in AllKeys<T>]: PickTypeOf<T, keys>;
};

export type FullFilterable<TFilter = {}> = TFilter & ListRequestParams;
export type Filterable<TFilter = {}> = Omit<FullFilterable<TFilter>, 'offset'>;

export type StateKeyType = 'list' | 'single' | 'add' | 'delete' | 'update';
export type StateKeyParamType = Record<StateKeyType, boolean>;

export type StatusType = 'default' | 'loading' | 'error' | 'success';
