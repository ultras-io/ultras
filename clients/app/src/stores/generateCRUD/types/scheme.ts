export interface ISchemeField<TFieldValue> {
  initialValue?: TFieldValue | null;
  processValue?(valueOriginal: TFieldValue | null): TFieldValue;
  validate?(
    valueOriginal: TFieldValue | null,
    valueToSave: TFieldValue | null
  ): Array<string>;
}

export type IScheme<T> = {
  [TKey in keyof T]: ISchemeField<T[TKey]>;
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
