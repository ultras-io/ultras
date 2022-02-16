import { DbIdentifier } from '../types';

export type GetVenuesFilter = {
  name?: string;
  countryId?: DbIdentifier;
  cityId?: DbIdentifier;
};
