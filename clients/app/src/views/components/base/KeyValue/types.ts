export interface IKeyValueProps {
  name: string;
  value: string | boolean;
  description?: string;
}

export interface IKeyValueGroupProps {
  children: Array<React.ReactNode>;
  description?: string;
}
