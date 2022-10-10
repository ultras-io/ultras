import { CityViewModel } from '@ultras/view-models';
import { RouteProp } from '@react-navigation/native';

export interface ISelectCityProps {
  route: RouteProp<
    {
      params: {
        cityId: ResourceIdentifier;
      };
    },
    'params'
  >;
}

export interface ISelectCityContainerProps {
  cityId: null | ResourceIdentifier;
}

export interface ISearchCityComponentProps {
  onChange(value: string): void;
}

export interface ISelectCityComponentProps {
  loading: boolean;
  data: Array<CityViewModel>;
  cityId: null | ResourceIdentifier;
  onSelect(cityId: ResourceIdentifier): void;
  onEndReached?(): void;
}
