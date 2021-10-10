import db from 'core/data/models';

import { DEFAULT_PAGINATION_ATTRIBUTES } from '@constants';
console.log('-------', db);
enum Order {
  asc = 'asc',
  desc = 'desc',
}
import { GetAllNTeamsActionParams, GetAllNTeamsActionResult } from './types';

class NationalTeamController {
  static async getAll({
    limit = DEFAULT_PAGINATION_ATTRIBUTES.LIMIT,
    offset = DEFAULT_PAGINATION_ATTRIBUTES.OFFSET,
    order = Order.asc,
    name,
  }: GetAllNTeamsActionParams): Promise<GetAllNTeamsActionResult> {
    let query = null;
    if (name) {
      query = {
        name: {
          [db.Sequelize.Op.iLike]: name,
        },
      };
    }

    const { rows, count } = await db.NationalTeam.findAndCountAll({
      limit,
      offset,
      where: query,
      order: [['name', order]],
    });

    return {
      data: rows,
      count,
      limit,
      offset,
    };
  }
}

export default NationalTeamController;
