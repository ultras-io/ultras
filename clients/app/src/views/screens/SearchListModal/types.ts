import { RouteProp } from '@react-navigation/native';
import { CountryViewModel, TeamViewModel } from '@ultras/core-api-sdk';

export type DataKeyType = 'team' | 'country';

export interface ISearchListModalProps {
  route: RouteProp<
    { params: { dataKey: DataKeyType; parentScreenName: string } },
    'params'
  >;
}

export interface ISearchListContainerProps {
  dataType: DataKeyType;
  searchText: string;
  onSelect: (params: onSelectParams) => void;
}

export interface ISearchListComponentProps {
  loading,
  dataType: DataKeyType;
  data: Array<CountryViewModel> | Array<TeamViewModel>;
  onEndReached: () => void;
  onSelect: (params: onSelectParams) => void;
}

type onSelectParams = {
  id: string;
  name: string;
  dataType: DataKeyType;
};
