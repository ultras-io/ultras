import { DbIdentifier, ServiceResultType } from 'types';
import resources from 'core/data/lcp';
import db from 'core/data/models';
import { User, UserCreationAttributes } from 'core/data/models/User';

import BaseService from './BaseService';

interface UserUniqueIdentifierInterface {
  phone?: null | string;
  email?: null | string;
  username?: null | string;
  id?: null | DbIdentifier;
}
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

  static async findByUniqueIdentifier(
    identifier: UserUniqueIdentifierInterface
  ): ServiceResultType<null | User> {
    const query = this.queryInit();

    if (identifier.email) {
      this.queryAppend(query, 'email', identifier.email);
    } else if (identifier.phone) {
      this.queryAppend(query, 'phone', identifier.phone);
    } else if (identifier.username) {
      this.queryAppend(query, 'username', identifier.username);
    } else if (identifier.id) {
      this.queryAppend(query, 'id', identifier.id);
    } else {
      return null;
    }

    const user = await db.User.findOne({ where: query });
    return user;
  }

  static async createUserFromInvitationByPhone(
    phone: string
  ): ServiceResultType<null | User> {
    // TODO: write logic to create user and send notification
    return null;
  }

  static async createUserFromInvitationByEmail(
    email: string
  ): ServiceResultType<null | User> {
    // TODO: write logic to create user and send notification
    return null;
  }
}

export default UserService;
