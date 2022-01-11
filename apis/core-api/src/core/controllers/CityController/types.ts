import { ListRequestParams } from '@ultras/utils';
import { ControllerActionOperatedResult, ControllerListActionResult } from 'types';
import { CityCreationAttributes } from 'core/data/models/City';

export interface GetAllCitiesActionParams extends ListRequestParams {
  name?: string;
  code?: string;
  countryId?: number;
}

export type GetAllCitiesActionResult = ControllerListActionResult<CityCreationAttributes>;

export type InjectCitiesDataResult = ControllerActionOperatedResult<{
  success: boolean;
}>;

export type GetCityByIdResult = ControllerActionOperatedResult<CityCreationAttributes>;
