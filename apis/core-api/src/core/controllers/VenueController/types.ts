import { VenueViewModel, VenuesViewModel } from '@ultras/view-models';
import {
  ControllerListParamsType,
  ControllerListResultType,
  ControllerByIdResultType,
  ControllerInjectionResultType,
  DbIdentifier,
} from 'types';

interface VenuesFilterInterface {
  name?: string;
  countryId?: DbIdentifier;
  cityId?: DbIdentifier;
}

export type VenuesListParams = ControllerListParamsType<VenuesFilterInterface>;
export type VenuesListResult = ControllerListResultType<VenuesViewModel>;
export type VenueByIdResult = ControllerByIdResultType<VenueViewModel>;
export type VenuesInjectDataResult = ControllerInjectionResultType;
