import { DbIdentifier } from 'types';
import BaseService from 'services/BaseService';

import db from 'core/data/models';
import { FavoriteTeamCreationAttributes } from 'core/data/models/FavoriteTeam';

class FavoriteTeamService extends BaseService {
  static async addToUserFavorites(
    userId: DbIdentifier,
    teamsId: DbIdentifier | Array<DbIdentifier>
  ): Promise<void> {
    if (!Array.isArray(teamsId)) {
      teamsId = [teamsId];
    }

    const data: Array<FavoriteTeamCreationAttributes> = teamsId.map(
      (teamId: DbIdentifier) => ({
        userId,
        teamId,
      })
    );

    await db.FavoriteTeam.bulkCreate(data, {
      ignoreDuplicates: true,
    });
  }
}

export default FavoriteTeamService;
