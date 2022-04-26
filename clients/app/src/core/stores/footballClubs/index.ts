import { TeamViewModel, TeamSDK } from '@ultras/core-api-sdk';
import { TeamTypesEnum } from '@ultras/utils';
import { generateCRUD } from '../generateCRUD';

const sdk = new TeamSDK('dev');

const footballClubStore = generateCRUD<TeamViewModel>({
  keys: ['list'],

  loadAll: (limit: number, offset: number) => {
    return sdk.getTeams({
      limit,
      offset,
      type: TeamTypesEnum.club,
    });
  },

  loadSingle: (id: DbIdentifier) => {
    return sdk.getTeam(id);
  },
});

export default footballClubStore;
