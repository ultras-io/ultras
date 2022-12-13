import { FlatListProps } from 'react-native';

export interface IFlatList<T = any> extends FlatListProps<T> {
  loading: boolean;
}
