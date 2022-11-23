import { generateCRUD } from '../generateCRUD';
import { buildRoomSDK } from 'stores/sdkBuilder/sdkBuilder';

import type { ParamType, TCreateRoomCatch, TDeleteRoomCatch } from './types';

const sdk = buildRoomSDK();

const buildRoomCatchesStore = (params: Partial<ParamType> = {}) => {
  return generateCRUD<
    null,
    null,
    TCreateRoomCatch,
    null,
    TDeleteRoomCatch,
    null,
    'add' | 'delete'
  >({
    keys: ['add', 'delete'],
    ...(params as ParamType),

    create: (data: TCreateRoomCatch) => {
      return sdk.catch(data.roomId);
    },

    remove: (data: TDeleteRoomCatch) => {
      return sdk.uncatch(data.roomId);
    },
  });
};

export default buildRoomCatchesStore;
