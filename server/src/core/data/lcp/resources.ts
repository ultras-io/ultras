import { Model } from 'sequelize';

const resources = {
  /*  USER_ROLE: {
    RELATION: 'UserRole',
    MODEL: 'UserRole',
    ALIAS: {
      SINGULAR: 'role',
      PLURAL: 'roles',
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
  TOKEN: {
    RELATION: 'Token',
    MODEL: 'Token',
    ALIAS: {
      SINGULAR: 'token',
      PLURAL: 'tokens',
    },
  },*/
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

  FOOTBALL_CLUB: {
    RELATION: 'FootballClub',
    MODEL: 'FootballClub',
    ALIAS: {
      SINGULAR: 'footballClub',
      PLURAL: 'footballClubs',
    },
  },
};

export interface IDBSet {
  User: typeof Model;
  TokenType: typeof Model;
  FootBallClub: typeof Model;
}

export default resources;
