export interface FieldInterface {
  value: Nullable<string>;
  touched: boolean;
  valid: boolean;
}

interface IBaseProp<T> {
  fullname: T;
  email: T;
  phone: T;
}

export interface IState extends IBaseProp<FieldInterface> {
  userId: number;
}

export interface IParam extends IBaseProp<Nullable<string>> {
  userId: number;
}

export interface IMethods {
  initiateWithValues(initial: IParam): void;
  setFieldValue(field: keyof IState, value: string): void;
  update(): Promise<void>;
}

export interface IStore extends IState, IMethods {}
