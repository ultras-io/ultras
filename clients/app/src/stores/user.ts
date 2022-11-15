import { UserViewModel } from '@ultras/core-api-sdk';
import { generateCRUD, IInitStoreParams } from './generateCRUD';
import { buildUserSDK } from './sdkBuilder/sdkBuilder';

type ParamType<TScheme> = IInitStoreParams<UserViewModel, TScheme>;

const sdk = buildUserSDK();

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
