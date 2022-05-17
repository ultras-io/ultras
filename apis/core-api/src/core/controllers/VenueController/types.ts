import { VenueViewModel, VenuesViewModel } from '@ultras/view-models';
import {
  ControllerListParamsType,
  ControllerListResultType,
  ControllerByIdResultType,
  ControllerInjectionResultType,
  ResourceIdentifier,
} from 'types';

interface VenuesFilterInterface {
  name?: string;
  countryId?: ResourceIdentifier;
  cityId?: ResourceIdentifier;
}

export type VenuesListParams = ControllerListParamsType<VenuesFilterInterface>;
export type VenuesListResult = ControllerListResultType<VenuesViewModel>;
export type VenueByIdResult = ControllerByIdResultType<VenueViewModel>;
export type VenuesInjectDataResult = ControllerInjectionResultType;
