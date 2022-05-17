import { MatchViewModel, MatchSDK } from '@ultras/core-api-sdk';
import { generateCRUD } from './generateCRUD';

const sdk = new MatchSDK('dev');

const buildMatchesStore = () => {
  return generateCRUD<MatchViewModel, 'list' | 'single'>({
    keys: ['list', 'single'],

    loadAll: (limit: number, offset: number) => {
      return sdk.getMatches({
        limit,
        offset,
      });
    },

    loadSingle: (id: DbIdentifier) => {
      return sdk.getMatch(id);
    },
  });
};

export default buildMatchesStore;
