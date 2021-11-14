import {
  ControllerActionOperatedResult,
  ControllerListActionResult,
  ListRequestParams,
} from 'types';
import { CountryAttributes } from 'core/data/models/Country';

export interface GetAllCountriesActionParams extends ListRequestParams {
  name?: string;
  code?: string;
}

export type GetAllCountriesActionResult = ControllerListActionResult<CountryAttributes>;

export type InjectCountriesDataResult = ControllerActionOperatedResult<{
  success: boolean;
}>;

export type GetCountryByIdResult = ControllerActionOperatedResult<CountryAttributes>;
