import {RouteProp} from '@react-navigation/native';
import {ThemeInterface} from 'styled-components';

export enum keyEnum {
  Code,
  FootballClub,
  NationalTeam,
}

export interface ISearchListModalProps {
  theme?: ThemeInterface;
  route: RouteProp<{params: {key: keyEnum}}, 'params'>;
}

export interface ISearchListContainerProps {
  theme?: ThemeInterface;
  dataKey: keyEnum;
  onClose: () => void;
}

export interface ISearchListComponentProps {
  theme?: ThemeInterface;
  name: string;
  data: Array<any>;
  onClose: () => void;
}
