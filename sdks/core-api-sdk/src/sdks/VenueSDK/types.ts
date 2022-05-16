import { ResourceIdentifier } from '../types';

export type GetVenuesFilter = {
  name?: string;
  countryId?: ResourceIdentifier;
  cityId?: ResourceIdentifier;
};
