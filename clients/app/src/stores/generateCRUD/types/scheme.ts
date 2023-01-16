export interface ISchemeField<TFieldValue, TStoreState> {
  initialValue?: TFieldValue | null;
  processValue?(data: {
    valueOriginal: TFieldValue | null;
    storeState: TStoreState;
  }): TFieldValue;
  validate?(data: {
    storeState: TStoreState;
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
