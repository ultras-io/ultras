import { RouteProp } from '@react-navigation/native';
import { CountryViewModel, TeamViewModel } from '@ultras/core-api-sdk';

type datsKeyType = 'team' | 'country';

export interface ISearchListModalProps {
  route: RouteProp<
    { params: { dataKey: datsKeyType; parentScreenName: string } },
    'params'
  >;
}

export interface ISearchListContainerProps {
  dataType: datsKeyType;
  searchText: string;
  onSelect: (params: onSelectParams) => void;
}

export interface ISearchListComponentProps {
  dataType: datsKeyType;
  data: Array<CountryViewModel> | Array<TeamViewModel>;
  onEndReached: () => void;
  onSelect: (params: onSelectParams) => void;
}

type onSelectParams = {
  id: string;
  name: string;
};
