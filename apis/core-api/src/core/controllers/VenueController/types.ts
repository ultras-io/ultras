import {
    ControllerActionOperatedResult,
    ControllerListActionResult,
    ListRequestParams,
  } from 'types';
  import { VenueAttributes } from 'core/data/models/Venue';
  
  export interface GetAllVenuesActionParams extends ListRequestParams {
    name?: string;
    countryId?: number;
    cityId?: number;
  }
  
  export type GetAllVenuesActionResult = ControllerListActionResult<VenueAttributes>;
  
  export type InjectVenuesDataResult = ControllerActionOperatedResult<{
    success: boolean;
  }>;
  
  export type GetVenueByIdResult = ControllerActionOperatedResult<VenueAttributes>;
  