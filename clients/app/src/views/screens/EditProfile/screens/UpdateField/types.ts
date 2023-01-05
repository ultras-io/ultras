import { RouteProp } from '@react-navigation/native';
import { IFieldProps } from '../../types';

export interface IUpdateFieldProps {
  route: RouteProp<
    {
      params: IFieldProps;
    },
    'params'
  >;
}

export interface IUpdateFieldContainerProps extends IFieldProps {}

export type ConfirmationType =
  | 'none'
  | 'loading'
  | 'pending'
  | 'confirmed'
  | 'user-exists';
