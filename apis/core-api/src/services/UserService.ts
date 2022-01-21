import BaseService from 'abstraction/BaseService';
import { ServiceResultType } from 'types';

import resources from 'core/data/lcp';
import db from 'core/data/models';
import { UserAttributes, UserCreationAttributes } from 'core/data/models/User';

class UserService extends BaseService {
  static async isUsernameTaken(username: string): ServiceResultType<boolean> {
    const user = await db.User.findOne({
      where: {
        username: username,
      },
    });

    return null != user;
  }

  static async isUsernameAvailable(username: string): ServiceResultType<boolean> {
    return !this.isUsernameTaken(username);
  }
}

export default UserService;
