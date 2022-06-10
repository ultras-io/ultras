import { MultiResourceIdentifier } from '../types';

export type GetCitiesFilter = {
  name?: string;
  countryId?: MultiResourceIdentifier;
};

type CountryView = {
  id: ResourceIdentifier;
  name: string;
  code?: string;
};

export type CityView = {
  id: number;
  name: string;
  country: CountryView;
};
