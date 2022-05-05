/* eslint-disable @typescript-eslint/no-unused-vars */

import { TeamViewModel, TeamSDK, DbIdentifier } from '@ultras/core-api-sdk';
import { TeamTypesEnum } from '@ultras/utils';
import { generateCRUD, SchemeInterface } from './generateCRUD';

const sdk = new TeamSDK('dev');

const buildNationalTeamStore = (scheme?: SchemeInterface) => {
  return generateCRUD<TeamViewModel, 'list' | 'single'>({
    keys: ['list', 'single'],

    loadAll: (limit: number, offset: number) => {
      return sdk.getTeams({
        limit,
        offset,
        type: TeamTypesEnum.national,
      });
    },

    loadSingle: (id: DbIdentifier) => {
      return sdk.getTeam(id);
    },
  });
};

export default buildNationalTeamStore;
