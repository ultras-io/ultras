import { UserViewModel, UserSDK, ResourceIdentifier } from '@ultras/core-api-sdk';
import { generateCRUD, InitStoreParamsInterface } from './generateCRUD';

type ParamType = InitStoreParamsInterface<UserViewModel>;

const sdk = new UserSDK('dev');

const buildUserStore = (params: Partial<ParamType> = {}) => {
  return generateCRUD<
    UserViewModel,
    UserViewModel,
    null,
    null,
    ResourceIdentifier,
    null,
    'single'
  >({
    keys: ['single'],
    ...(params as ParamType),

    loadSingle: (id: ResourceIdentifier) => {
      return sdk.getProfile(id);
    },
  });
};

export default buildUserStore;
