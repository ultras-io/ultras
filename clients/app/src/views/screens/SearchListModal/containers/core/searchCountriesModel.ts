// @ts-ignore
import create from 'zustand';
import { CountrySDK } from '@ultras/core-api-sdk';

import {
  GetState,
  ICountry,
  ICountryControllerMethods,
  ICountryListState,
  RequestStatuses,
  SetState,
} from './types';
import { ListRequestParams } from '@ultras/utils';

const defaultPaginationConfig = {
  limit: 50,
  offset: 0,
};

const initialListDataState: ICountryListState = {
  response: {
    totalCount: null,
    error: null,
    data: null,
  },
  request: {
    pagination: defaultPaginationConfig,
    status: RequestStatuses.UNSET,
  },
};

const model = create<ICountryListState>((set: SetState, get: GetState) => ({
  ...initialListDataState,
  ...generateControllerMethods(set, get),
}));

function generateControllerMethods(
  set: SetState,
  get: GetState
): ICountryControllerMethods {
  const countrySdk = new CountrySDK(process.env.NODE_ENV);

  function setRequestStatus(status: RequestStatuses) {
    set((state: ICountryListState) => ({
      ...state,
      request: {
        ...state.request,
        status,
      },
    }));
  }

  function getRequestStatus(): RequestStatuses {
    return get().request.status;
  }

  function initState() {
    set(() => initialListDataState);
  }

  async function getList() {
    const params: ListRequestParams = {};
    const countries: ICountry[] = await countrySdk.getCountries();
  }

  function initialRequest() {}

  return {
    initState,
    initialRequest,
    setRequestStatus,
    getRequestStatus,
  };
}

export default model;
