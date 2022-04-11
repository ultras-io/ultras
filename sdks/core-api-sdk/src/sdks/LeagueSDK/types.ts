import { DbIdentifier } from '../types';

export type GetLeaguesFilter = {
  name?: string;
  countryId?: DbIdentifier;
};
