import { UserViewModel, UserSDK, ResourceIdentifier } from '@ultras/core-api-sdk';
import { generateCRUD, InitStoreParamsInterface } from './generateCRUD';

type ParamType<TScheme> = InitStoreParamsInterface<UserViewModel, TScheme>;

const sdk = new UserSDK('dev');

const buildUserStore = <TScheme>(params: Partial<ParamType<TScheme>> = {}) => {
  return generateCRUD<
    UserViewModel,
    UserViewModel,
    null,
    null,
    ResourceIdentifier,
    null,
    TScheme,
    'single'
  >({
    keys: ['single'],
    ...(params as ParamType<TScheme>),

    loadSingle: (id: ResourceIdentifier) => {
      return sdk.getProfile(id);
    },
  });
};

export default buildUserStore;
