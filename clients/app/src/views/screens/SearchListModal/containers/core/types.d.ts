type Pagination = {
  limit?: number;
  offset?: number;
};

type InitialUnset = null;

interface IFailedRequestState {
  message: string;
  debug: string;
  statusCode: number;
}

export enum RequestStatuses {
  INITIAL_UNSET = 'INITIAL_UNSET',
  PENDING = 'PENDING',
  FAILED = 'FAILED',
  SUCCEED = 'SUCCEED',
}

export interface IListSearchStore<T> {
  response: {
    data: T[] | InitialUnset;
    totalCount: number | InitialUnset;
    error: IFailedRequestState | InitialUnset;
  };
  request: {
    pagination: Pagination;
    status: RequestStatuses;
  };
}

export interface ICountryControllerMethods {
  initialRequest: () => void;
  getRequestStatus: () => RequestStatuses;
  setRequestStatus: (status: RequestStatuses) => void;
  resetState: () => void;
}

export interface ICountry {
  id: number;
  name: string;
  code: string;
  flag: string;
  telPrefix?: string;
  dataRapidId?: number;
}

export type ICountryListState = IListSearchStore<ICountry>;

export type GetState = () => ICountryListState;
export type SetState = (
  state: (state: ICountryListState) => ICountryListState
) => ICountryListState;
