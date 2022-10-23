export interface IEditAvatarComponentProps {
  avatar: Nullable<string>;
  onChange?(image: string): void;
}

export interface IPersonalInfoInputComponentProps {
  name: string;
  value?: Nullable<string>;
  onChange?(value: string): void;
  [key: string]: any;
}
