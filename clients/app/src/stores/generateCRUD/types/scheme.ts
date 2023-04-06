type SchemeInitialValueCallableType<TFieldValue> = () => TFieldValue;

type SchemeInitialValueType<TFieldValue> =
  | TFieldValue
  | SchemeInitialValueCallableType<TFieldValue>
  | null;

export interface ISchemeField<TFieldValue, TStoreState> {
  initialValue?: SchemeInitialValueType<TFieldValue>;
  processValue?(data: {
    valueOriginal: TFieldValue | null;
    getState: () => Readonly<TStoreState>;
  }): TFieldValue;
  validate?(data: {
    getState: () => Readonly<TStoreState>;
    valueOriginal: TFieldValue | null;
    valueToSave: TFieldValue | null;
  }): Array<string>;
}

export type IScheme<TProvidedScheme> = {
  [TKey in keyof TProvidedScheme]: ISchemeField<
    TProvidedScheme[TKey],
    IStateDataScheme<TProvidedScheme>
  >;
};

export interface IBeforeSend<TData, TScheme> {
  (data: IStateDataScheme<TScheme>): Partial<TData> | null;
}

export interface IStateFieldScheme<TFieldValue> {
  isValid: boolean;
  valueOriginal: TFieldValue | null;
  valueToSave: TFieldValue | null;
  errors: Array<string>;
}

export type IStateDataScheme<T> = {
  [TKey in keyof T]: IStateFieldScheme<T[TKey]>;
};
