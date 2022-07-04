export interface SchemeFieldInterface<TFieldValue = string> {
  initialValue?: TFieldValue | null;
  processValue?(valueOriginal: TFieldValue | null): TFieldValue;
  validate?(
    valueOriginal: TFieldValue | null,
    valueToSave: TFieldValue | null
  ): Array<string>;
}

export interface SchemeInterface {
  [key: string]: SchemeFieldInterface;
}

export interface BeforeSendInterface<TData> {
  (data: StateDataSchemeInterface): Partial<TData> | null;
}

export interface StateFieldSchemeInterface<TFieldValue = string> {
  isValid: boolean;
  valueOriginal: TFieldValue | null;
  valueToSave: TFieldValue | null;
  errors: Array<string>;
}

export interface StateDataSchemeInterface {
  [key: string]: StateFieldSchemeInterface;
}
