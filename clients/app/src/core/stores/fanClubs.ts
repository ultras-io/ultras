import { FanClubViewModel, FanClubSDK } from '@ultras/core-api-sdk';
import { generateCRUD, SchemeInterface } from './generateCRUD';

const sdk = new FanClubSDK('dev');

const buildFanClubStore = (scheme?: SchemeInterface) => {
  return generateCRUD<FanClubViewModel, 'list' | 'single' | 'add'>({
    keys: ['list', 'single', 'add'],

    loadAll: (limit: number, offset: number) => {
      return sdk.getFanClubs({
        limit,
        offset,
      });
    },

    loadSingle: (id: DbIdentifier) => {
      return sdk.getFanClub(id);
    },

    scheme: scheme,
  });
};

export default buildFanClubStore;
