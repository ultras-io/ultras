import { DbIdentifier } from '../types';

export type GetCitiesFilter = {
  name?: string;
  countryId?: DbIdentifier;
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
