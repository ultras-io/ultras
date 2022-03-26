import { DbIdentifier } from 'types';
import db from 'core/data/models';
import { FavoriteTeamCreationAttributes } from 'core/data/models/FavoriteTeam';

import BaseService from './BaseService';

class FavoriteTeamService extends BaseService {
  /**
   * Add user new favorite team.
   */
  static async add(
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
  /**
   * Remove user new favorite team.
   */
  static async remove(
    userId: DbIdentifier,
    teamsId: DbIdentifier | Array<DbIdentifier>
  ): Promise<void> {
    // TODO: write code ...
  }
}

export default FavoriteTeamService;
