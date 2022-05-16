import { ResourceIdentifier } from '../types';

export type GetCitiesFilter = {
  name?: string;
  countryId?: ResourceIdentifier;
};

type CountryView = {
  id: number;
  name: string;
  code?: string;
};

export type CityView = {
  id: number;
  name: string;
  country: CountryView;
};
