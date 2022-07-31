import type { VenueViewModel, VenuesViewModel } from '@ultras/view-models';
import type {
  ApiResponseBodyType,
  ListResponseMetaType,
  MultiResourceIdentifier,
} from '../types';

export type GetVenuesFilter = {
  name?: string;
  countryId?: MultiResourceIdentifier;
  cityId?: MultiResourceIdentifier;
};

export type GetVenuesResponse = ApiResponseBodyType<
  VenuesViewModel,
  ListResponseMetaType
>;
export type GetVenueResponse = ApiResponseBodyType<VenueViewModel>;
