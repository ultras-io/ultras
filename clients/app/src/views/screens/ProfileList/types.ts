import { RouteProp } from '@react-navigation/native';

export interface IProfileListProps {
  route: RouteProp<{ params: { tabName: string; title: string } }, 'params'>;
}

export interface IProfileListContainerProps {
  title: string;
}

export interface IProfileListComponentProps {
  data: any;
}
