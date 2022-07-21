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
      // @TODO chnange to getProfile when SDK will be implemented
      return sdk.getMe(id);
    },
  });
};

export default buildUserStore;
