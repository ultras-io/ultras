import { Model } from 'sequelize';

const resources = {
  TOKEN_TYPE: {
    RELATION: 'TokenType',
    MODEL: 'TokenType',
    ALIAS: {
      SINGULAR: 'tokenType',
      PLURAL: 'tokenTypes',
    },
  },
  USER: {
    RELATION: 'User',
    MODEL: 'User',
    ALIAS: {
      SINGULAR: 'user',
      PLURAL: 'users',
    },
  },

  FAVORITE_TEAM: {
    RELATION: 'FavoriteTeam',
    MODEL: 'FavoriteTeam',
    ALIAS: {
      SINGULAR: 'favoriteTeam',
      PLURAL: 'favoriteTeams',
    },
  },
  VERIFICATION_CODE: {
    RELATION: 'VerificationCode',
    MODEL: 'VerificationCode',
    ALIAS: {
      SINGULAR: 'verificationCode',
      PLURAL: 'verificationCodes',
    },
  },

  USER_SESSION: {
    RELATION: 'UserSession',
    MODEL: 'UserSession',
    ALIAS: {
      SINGULAR: 'userSession',
      PLURAL: 'userSessions',
    },
  },

  // venue-team-country-league-match-score system
  VENUE: {
    RELATION: 'Venue',
    MODEL: 'Venue',
    ALIAS: {
      SINGULAR: 'venue',
      PLURAL: 'venues',
    },
  },
  COUNTRY: {
    RELATION: 'Country',
    MODEL: 'Country',
    ALIAS: {
      SINGULAR: 'country',
      PLURAL: 'country',
    },
  },
  CITY: {
    RELATION: 'City',
    MODEL: 'City',
    ALIAS: {
      SINGULAR: 'city',
      PLURAL: 'cities',
    },
  },
  LEAGUE: {
    RELATION: 'League',
    MODEL: 'League',
    ALIAS: {
      SINGULAR: 'league',
      PLURAL: 'leagues',
    },
  },
  TEAM: {
    RELATION: 'Team',
    MODEL: 'Team',
    ALIAS: {
      SINGULAR: 'team',
      PLURAL: 'teams',
    },
  },
  SCORE: {
    RELATION: 'Score',
    MODEL: 'Score',
    ALIAS: {
      SINGULAR: 'score',
      PLURAL: 'scores',
    },
  },
  MATCH: {
    RELATION: 'Match',
    MODEL: 'Match',
    ALIAS: {
      SINGULAR: 'match',
      PLURAL: 'matches',
    },
  },
  FAN_CLUB: {
    RELATION: 'FanClub',
    MODEL: 'FanClub',
    ALIAS: {
      SINGULAR: 'fanClub',
      PLURAL: 'fanClubs',
    },
  },
  FAN_CLUB_MEMBER: {
    RELATION: 'FanClubMember',
    MODEL: 'FanClubMember',
    ALIAS: {
      SINGULAR: 'fanClubMember',
      PLURAL: 'fanClubMembers',
    },
  },
  FAN_CLUB_MEMBER_ROLE: {
    RELATION: 'FanClubMemberRole',
    MODEL: 'FanClubMemberRole',
    ALIAS: {
      SINGULAR: 'fanClubMemberRole',
      PLURAL: 'fanClubMemberRoles',
    },
  },
  POST: {
    RELATION: 'Post',
    MODEL: 'Post',
    ALIAS: {
      SINGULAR: 'post',
      PLURAL: 'posts',
    },
  },
  POST_MEMBER: {
    RELATION: 'PostMember',
    MODEL: 'PostMember',
    ALIAS: {
      SINGULAR: 'postMember',
      PLURAL: 'postMembers',
    },
  },
  TOPIC: {
    RELATION: 'Topic',
    MODEL: 'Topic',
    ALIAS: {
      SINGULAR: 'topic',
      PLURAL: 'topics',
    },
  },
  EVENT: {
    RELATION: 'Event',
    MODEL: 'Event',
    ALIAS: {
      SINGULAR: 'event',
      PLURAL: 'events',
    },
  },
  ROOM: {
    RELATION: 'Room',
    MODEL: 'Room',
    ALIAS: {
      SINGULAR: 'room',
      PLURAL: 'rooms',
    },
  },
  LOCATION: {
    RELATION: 'Location',
    MODEL: 'Location',
    ALIAS: {
      SINGULAR: 'location',
      PLURAL: 'locations',
    },
  },
  CATCH: {
    RELATION: 'Catch',
    MODEL: 'Catch',
    ALIAS: {
      SINGULAR: 'catch',
      PLURAL: 'catches',
    },
  },
  COMMENT: {
    RELATION: 'Comment',
    MODEL: 'Comment',
    ALIAS: {
      SINGULAR: 'comment',
      PLURAL: 'comments',
    },
  },
};

export interface IDBSet {
  User?: typeof Model;
  TokenType?: typeof Model;
  City: typeof Model;
  Country: typeof Model;
}

export default resources;
