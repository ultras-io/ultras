import { MultiResourceIdentifier } from '../types';

export type GetVenuesFilter = {
  name?: string;
  countryId?: MultiResourceIdentifier;
  cityId?: MultiResourceIdentifier;
};
