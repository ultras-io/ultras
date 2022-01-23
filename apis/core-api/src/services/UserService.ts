import BaseService from 'abstraction/BaseService';
import { ServiceResultType } from 'types';

import resources from 'core/data/lcp';
import db from 'core/data/models';
import { UserCreationAttributes } from 'core/data/models/User';

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

  static async isEmailTaken(email: string): ServiceResultType<boolean> {
    const user = await db.User.findOne({
      where: {
        email: email,
      },
    });

    return null != user;
  }

  static async isEmailAvailable(email: string): ServiceResultType<boolean> {
    return !this.isEmailTaken(email);
  }

  static async isPhoneTaken(phone: string): ServiceResultType<boolean> {
    const user = await db.User.findOne({
      where: {
        phone: phone,
      },
    });

    return null != user;
  }

  static async isPhoneAvailable(phone: string): ServiceResultType<boolean> {
    return !this.isPhoneTaken(phone);
  }

  static async create({
    email,
    phone,
    avatar,
    username,
    fullname,
  }: UserCreationAttributes) {
    const user = await db.User.create({
      email,
      phone,
      avatar,
      username,
      fullname,
    });

    return user;
  }
}

export default UserService;
