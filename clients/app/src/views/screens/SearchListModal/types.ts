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
  onSelect: (params: OnSelectParams) => void;
}

export interface ISearchListComponentProps {
  dataType: dataKeyType;
  loading: boolean;
  data: Array<CountryViewModel> | Array<TeamViewModel>;
  onEndReached: () => void;
  onSelect: (params: OnSelectParams) => void;
}

type OnSelectParams = {
  id: string;
  name: string;
  dataType: dataKeyType;
};
