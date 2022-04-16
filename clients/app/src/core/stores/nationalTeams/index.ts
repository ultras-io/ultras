import { TeamViewModel, TeamSDK, DbIdentifier } from '@ultras/core-api-sdk';
import { TeamTypesEnum } from '@ultras/utils';
import { generateCRUD } from '../generateCRUD';

const sdk = new TeamSDK('dev');

const nationalTeamStore = generateCRUD<TeamViewModel>({
  loadAll: (limit: number, offset: number) => {
    return sdk.getTeams({
      limit,
      offset,
      type: TeamTypesEnum.national,
    });
  },

  loadById: (id: DbIdentifier) => {
    return sdk.getTeam(id);
  },
});

export default nationalTeamStore;
