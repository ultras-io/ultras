export interface IKeyValueProps {
  name: string;
  value: string | boolean;
  description?: string;
  onChange?: (value: boolean) => void;
}

export interface IKeyValueGroupProps {
  children: Array<React.ReactNode>;
  description?: string;
}
