import resources from 'core/data/lcp';
import db from 'core/data/models';

import BaseService from './BaseService';
import FanClubService from './FanClubService';
import MatchService from './MatchService';

class PostService extends BaseService {
  protected static includeRelations() {
    return {
      attributes: {
        exclude: ['fanClubId', 'matchId', 'authorId'],
      },
      include: [
        {
          model: db.FanClub,
          as: resources.FAN_CLUB.ALIAS.SINGULAR,
          ...FanClubService.getIncludeRelations(),
        },
        {
          model: db.Match,
          as: resources.MATCH.ALIAS.SINGULAR,
          ...MatchService.getIncludeRelations(),
        },
        {
          model: db.User,
          as: 'author',
        },
      ],
    };
  }

  // @TODO: add actions for Post.
}

export default PostService;
