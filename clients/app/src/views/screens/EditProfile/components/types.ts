import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';

export interface IEditAvatarComponentProps {
  avatar: Nullable<string>;
  onChange?(image: string): void;
}

export interface IPersonalInfoInputComponentProps {
  name: string;
  value?: Nullable<string>;
  onChange?(e: NativeSyntheticEvent<TextInputChangeEventData>): void;
}
