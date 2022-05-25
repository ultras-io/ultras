import { RouteProp } from '@react-navigation/native';
import { ThemeInterface } from 'styled-components';
import { CountryViewModel, TeamViewModel } from '@ultras/core-api-sdk';

export enum dataTypeEnum {
  Country,
  Team,
}

export interface ISearchListModalProps {
  theme?: ThemeInterface;
  route: RouteProp<{ params: { dataKey: dataTypeEnum } }, 'params'>;
}

export interface ISearchListContainerProps {
  theme?: ThemeInterface;
  dataType: dataTypeEnum;
  searchText: string;
}

export interface ISearchListComponentProps {
  theme?: ThemeInterface;
  dataType: dataTypeEnum;
  data: Array<CountryViewModel> | Array<TeamViewModel>;
  onEndReached: () => void;
}
