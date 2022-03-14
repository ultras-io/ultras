// @ts-ignore
import create from 'zustand';
import {
  GetState,
  ICountryControllerMethods,
  ICountryListState,
  RequestStatuses,
  SetState,
} from './types';

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
    status: RequestStatuses.INITIAL_UNSET,
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

  function resetState() {
    set(() => initialListDataState);
  }

  function initialRequest() {}

  return {
    resetState,
    initialRequest,
    setRequestStatus,
    getRequestStatus,
  };
}

export default model;
