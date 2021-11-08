import {RouteProp} from '@react-navigation/native';
import {ThemeInterface} from 'styled-components';

export enum keyEnum {
  Code,
  Team,
}

export enum dataTypeEnum {
  Country,
  NationalTeam,
  FootballClub,
}

export type SearchItem = {
  id: string;
  name: string;
  logo?: string;
  code?: string;
};

export interface ISearchListModalProps {
  theme?: ThemeInterface;
  route: RouteProp<{params: {dataKey: keyEnum}}, 'params'>;
}

export interface ISearchListContainerProps {
  theme?: ThemeInterface;
  dataType: dataTypeEnum;
  searchText: string;
}

export interface ISearchListComponentProps {
  theme?: ThemeInterface;
  data: Array<SearchItem>;
  onEndReached: () => void;
}
