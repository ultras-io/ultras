import { DbIdentifier } from '../types';

export type GetTeamsFilter = {
  name?: string;
  countryId?: DbIdentifier;
  cityId?: DbIdentifier;
};
