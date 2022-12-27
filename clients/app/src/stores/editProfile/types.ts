export type FieldType = 'avatar' | 'fullname' | 'email' | 'phone';

export interface IField {
  value: Nullable<string>;
  touched: boolean;
  valid: boolean;
}

type IBaseProp<T> = {
  [field in FieldType]: T;
};

export interface IState extends IBaseProp<IField> {}

export interface IParam extends IBaseProp<Nullable<string>> {}

export interface IMethods {
  initiateWithValues(initial: IParam): void;
  setFieldValue(field: FieldType, value: Nullable<string>): void;
  update(field: FieldType, confirmCode?: string): Promise<any>;
  sendCode(field: FieldType): Promise<any>;
}

export interface IStore extends IState, IMethods {}
