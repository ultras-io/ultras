import { KeyboardType } from 'react-native';
import { ThemeInterface } from 'styled-components';

export enum TypeEnum {
  Text,
  Number,
  Email,
  Phone,
  Select,
}

export enum StateEnum {
  Default,
  Disabled,
  Error,
}

export type InputValue = {
  isValid: boolean;
  value: string;
};

export type KeyboardTypes = {
  [TypeEnum.Text]: KeyboardType;
  [TypeEnum.Email]: KeyboardType;
  [TypeEnum.Number]: KeyboardType;
  [TypeEnum.Phone]: KeyboardType;
  [TypeEnum.Select]: KeyboardType;
};

export interface IInputProps {
  theme?: ThemeInterface;
  name?: string;
  value?: string;
  type?: TypeEnum;
  state?: StateEnum;
  withBorder?: boolean;
  validation?: (value: string) => boolean;
  onChange?: (value: InputValue) => void;
  onType?: (value: string) => void;
}
