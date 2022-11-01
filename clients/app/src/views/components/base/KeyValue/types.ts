type TValue = string | boolean | React.ReactNode;

export interface IKeyValueProps<T extends TValue = TValue> {
  viewMode?: 'inline' | 'label' | 'none';
  name?: string;
  options?: Record<string, string>;
  value: T;
  description?: string;
  onChange?: (newValue: T) => void;
}

export interface IKeyValueGroupProps {
  children: Array<React.ReactNode>;
  description?: string;
}

export interface IKeyValueDropdownProps<T extends string = string> {
  name: string;
  options: Record<string, string>;
  value: T;
  onChange?: (newValue: T) => void;
}
