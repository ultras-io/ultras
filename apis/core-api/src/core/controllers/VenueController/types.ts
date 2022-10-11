import { VenueViewModel, VenuesViewModel } from '@ultras/view-models';
import {
  ControllerListParamsType,
  ControllerListResultType,
  ControllerByIdResultType,
  ControllerInjectionResultType,
  ResourceIdentifier,
} from 'types';

interface IVenuesFilter {
  name?: string;
  countryId?: ResourceIdentifier;
  cityId?: ResourceIdentifier;
}

export type VenuesListParams = ControllerListParamsType<IVenuesFilter>;
export type VenuesListResult = ControllerListResultType<VenuesViewModel>;
export type VenueByIdResult = ControllerByIdResultType<VenueViewModel>;
export type VenuesInjectDataResult = ControllerInjectionResultType;
