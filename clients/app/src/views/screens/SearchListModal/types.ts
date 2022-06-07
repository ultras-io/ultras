import { RouteProp } from '@react-navigation/native';

import { CountryViewModel, TeamViewModel } from '@ultras/core-api-sdk';

export enum dataTypeEnum {
  Country,
  Team,
}

export interface ISearchListModalProps {
  route: RouteProp<{ params: { dataKey: dataTypeEnum } }, 'params'>;
}

export interface ISearchListContainerProps {
  dataType: dataTypeEnum;
  searchText: string;
}

export interface ISearchListComponentProps {
  dataType: dataTypeEnum;
  data: Array<CountryViewModel> | Array<TeamViewModel>;
  onEndReached: () => void;
}
