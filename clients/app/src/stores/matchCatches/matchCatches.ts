import { UserViewModel } from '@ultras/view-models';
import { generateCRUD } from '../generateCRUD';
import { buildMatchSDK } from 'stores/sdkBuilder/sdkBuilder';

import type {
  LoadAllParams,
  ParamType,
  TCreateMatchCatch,
  TDeleteMatchCatch,
} from './types';

const sdk = buildMatchSDK();

const buildMatchCatchesStore = (params: Partial<ParamType> = {}) => {
  return generateCRUD<
    UserViewModel,
    null,
    TCreateMatchCatch,
    null,
    TDeleteMatchCatch,
    null,
    'list' | 'add' | 'delete'
  >({
    keys: ['list', 'add', 'delete'],
    ...(params as ParamType),

    loadAll: (filter: LoadAllParams) => {
      return sdk.getCatches(filter.matchId, {
        ...filter,
      });
    },

    create: (data: TCreateMatchCatch) => {
      return sdk.catch(data.matchId);
    },

    remove: (data: TDeleteMatchCatch) => {
      return sdk.uncatch(data.matchId);
    },
  });
};

export default buildMatchCatchesStore;
