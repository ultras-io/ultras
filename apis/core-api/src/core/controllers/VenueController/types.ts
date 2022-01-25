import {
  ControllerListParamsType,
  ControllerListResultType,
  ControllerByIdResultType,
  ControllerInjectionResultType,
  DbIdentifier,
} from 'types';
import { VenueAttributes } from 'core/data/models/Venue';

interface VenuesFilterInterface {
  name?: string;
  countryId?: DbIdentifier;
  cityId?: DbIdentifier;
}

export type VenuesListParams = ControllerListParamsType<VenuesFilterInterface>;
export type VenuesListResult = ControllerListResultType<VenueAttributes>;
export type VenueByIdResult = ControllerByIdResultType<VenueAttributes>;
export type VenuesInjectDataResult = ControllerInjectionResultType;
