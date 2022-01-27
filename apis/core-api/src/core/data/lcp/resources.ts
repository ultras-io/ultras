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
};

export interface IDBSet {
  User?: typeof Model;
  TokenType?: typeof Model;
  City: typeof Model;
  Country: typeof Model;
}

export default resources;
