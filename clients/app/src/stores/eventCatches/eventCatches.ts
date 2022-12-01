import { generateCRUD } from '../generateCRUD';
import { buildEventSDK } from 'stores/sdkBuilder/sdkBuilder';

import type { ParamType, TCreateEventCatch, TDeleteEventCatch } from './types';

const sdk = buildEventSDK();

const buildEventCatchesStore = (params: Partial<ParamType> = {}) => {
  return generateCRUD<
    null,
    null,
    TCreateEventCatch,
    null,
    TDeleteEventCatch,
    null,
    'add' | 'delete'
  >({
    keys: ['add', 'delete'],
    ...(params as ParamType),

    create: (data: TCreateEventCatch) => {
      return sdk.catch(data.eventId);
    },

    remove: (data: TDeleteEventCatch) => {
      return sdk.uncatch(data.eventId);
    },
  });
};

export default buildEventCatchesStore;
