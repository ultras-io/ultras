export interface SchemeFieldInterface<TFieldValue> {
  initialValue?: TFieldValue | null;
  processValue?(valueOriginal: TFieldValue | null): TFieldValue;
  validate?(
    valueOriginal: TFieldValue | null,
    valueToSave: TFieldValue | null
  ): Array<string>;
}

export type SchemeInterface<T> = {
  [TKey in keyof T]: SchemeFieldInterface<T[TKey]>;
};

export interface BeforeSendInterface<TData, TScheme> {
  (data: StateDataSchemeInterface<TScheme>): Partial<TData> | null;
}

export interface StateFieldSchemeInterface<TFieldValue> {
  isValid: boolean;
  valueOriginal: TFieldValue | null;
  valueToSave: TFieldValue | null;
  errors: Array<string>;
}

export type StateDataSchemeInterface<T> = {
  [TKey in keyof T]: StateFieldSchemeInterface<T[TKey]>;
};
