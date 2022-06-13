import { RouteProp } from '@react-navigation/native';
import { CountryViewModel, TeamViewModel } from '@ultras/core-api-sdk';

export type dataKeyType = 'team' | 'country';

export interface ISearchListModalProps {
  route: RouteProp<
    { params: { dataKey: dataKeyType; parentScreenName: string } },
    'params'
  >;
}

export interface ISearchListContainerProps {
  dataType: dataKeyType;
  searchText: string;
  onSelect: (params: onSelectParams) => void;
}

export interface ISearchListComponentProps {
  dataType: dataKeyType;
  data: Array<CountryViewModel> | Array<TeamViewModel>;
  onEndReached: () => void;
  onSelect: (params: onSelectParams) => void;
}

type onSelectParams = {
  id: string;
  name: string;
  dataType: dataKeyType;
};
