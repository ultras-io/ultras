import { InterfaceInputProps } from 'native-base/lib/typescript/components/primitives/Input/types';

export interface IInputProps extends Omit<InterfaceInputProps, 'onChange'> {
  onChange: (text: string) => void;
  debounce?: boolean;
}
