import { IFieldProps } from '../../../types';

export interface IEditAvatarComponentProps {
  avatar: Nullable<string>;
  onChange?(image: string): void;
}

export interface IPersonalInfoInputComponentProps extends IFieldProps {}
