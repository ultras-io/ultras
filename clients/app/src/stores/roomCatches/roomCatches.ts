import { generateCRUD } from '../generateCRUD';
import { buildRoomSDK } from 'stores/sdkBuilder/sdkBuilder';

import type {
  LoadAllParams,
  ParamType,
  TCreateRoomCatch,
  TDeleteRoomCatch,
} from './types';

const sdk = buildRoomSDK();

const buildRoomCatchesStore = (params: Partial<ParamType> = {}) => {
  return generateCRUD<
    null,
    null,
    TCreateRoomCatch,
    null,
    TDeleteRoomCatch,
    null,
    'list' | 'add' | 'delete'
  >({
    keys: ['list', 'add', 'delete'],
    ...(params as ParamType),

    loadAll: (filter: LoadAllParams) => {
      return sdk.getCatches(filter.roomId, {
        ...filter,
      });
    },

    create: (data: TCreateRoomCatch) => {
      return sdk.catch(data.roomId);
    },

    remove: (data: TDeleteRoomCatch) => {
      return sdk.uncatch(data.roomId);
    },
  });
};

export default buildRoomCatchesStore;
