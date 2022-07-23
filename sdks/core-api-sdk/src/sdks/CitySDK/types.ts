import type { CitiesViewModel, CityViewModel } from '@ultras/view-models';
import type {
  ApiResponseBodyType,
  ListResponseMetaType,
  MultiResourceIdentifier,
} from '../types';

export type GetCitiesFilter = {
  name?: string;
  countryId?: MultiResourceIdentifier;
};

export type GetCitiesResponse = ApiResponseBodyType<
  CitiesViewModel,
  ListResponseMetaType
>;

export type GetCityResponse = ApiResponseBodyType<CityViewModel>;
