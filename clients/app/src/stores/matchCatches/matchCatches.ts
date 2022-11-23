import { generateCRUD } from '../generateCRUD';
import { buildMatchSDK } from 'stores/sdkBuilder/sdkBuilder';

import type { ParamType, TCreateMatchCatch, TDeleteMatchCatch } from './types';

const sdk = buildMatchSDK();

const buildMatchCatchesStore = (params: Partial<ParamType> = {}) => {
  return generateCRUD<
    null,
    null,
    TCreateMatchCatch,
    null,
    TDeleteMatchCatch,
    null,
    'add' | 'delete'
  >({
    keys: ['add', 'delete'],
    ...(params as ParamType),

    create: (data: TCreateMatchCatch) => {
      return sdk.catch(data.matchId);
    },

    remove: (data: TDeleteMatchCatch) => {
      return sdk.uncatch(data.matchId);
    },
  });
};

export default buildMatchCatchesStore;
