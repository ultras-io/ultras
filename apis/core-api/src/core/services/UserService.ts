import { Transaction } from 'sequelize';
import { ResourceIdentifier, ServiceResultType } from 'types';
import resources from 'core/data/lcp';
import db from 'core/data/models';
import { User, UserCreationAttributes } from 'core/data/models/User';

import BaseService from './BaseService';

interface IUserUniqueIdentifier {
  phone?: null | string;
  email?: null | string;
  username?: null | string;
  id?: null | ResourceIdentifier;
}

type UpdateProfile<T> = T & { userId: ResourceIdentifier };

class UserService extends BaseService {
  /**
   * Check username is taken.
   */
  static async isUsernameTaken(username: string): ServiceResultType<boolean> {
    const user = await db.User.findOne({
      where: {
        username: username,
      },
    });

    return null != user;
  }

  /**
   * Check username is available.
   */
  static async isUsernameAvailable(username: string): ServiceResultType<boolean> {
    return !this.isUsernameTaken(username);
  }

  /**
   * Check email is taken.
   */
  static async isEmailTaken(email: string): ServiceResultType<boolean> {
    const user = await db.User.findOne({
      where: {
        email: email,
      },
    });

    return null != user;
  }

  /**
   * Check email is available.
   */
  static async isEmailAvailable(email: string): ServiceResultType<boolean> {
    return !this.isEmailTaken(email);
  }

  /**
   * Check phone is taken.
   */
  static async isPhoneTaken(phone: string): ServiceResultType<boolean> {
    const user = await db.User.findOne({
      where: {
        phone: phone,
      },
    });

    return null != user;
  }

  /**
   * Check phone is available.
   */
  static async isPhoneAvailable(phone: string): ServiceResultType<boolean> {
    return !this.isPhoneTaken(phone);
  }

  /**
   * Create user.
   */
  static async create(
    { email, phone, avatar, username, fullname }: UserCreationAttributes,
    transaction?: Transaction
  ) {
    const user = await db.User.create(
      {
        email,
        phone,
        avatar,
        username,
        fullname,
      },
      { transaction }
    );

    return user;
  }

  /**
   * Find user by their identifier.
   *
   * User specific identifier fields:
   * 1) id
   * 2) username
   * 3) phone
   * 4) email
   */
  static async findByUniqueIdentifier(
    identifier: IUserUniqueIdentifier
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

  /**
   * Create user from fan club invitation by phone number.
   */
  static async createUserFromInvitationByPhone(
    phone: string
  ): ServiceResultType<null | User> {
    // TODO: write logic to create user and send notification
    return null;
  }

  /**
   * Create user from fan club invitation by email address.
   */
  static async createUserFromInvitationByEmail(
    email: string
  ): ServiceResultType<null | User> {
    // TODO: write logic to create user and send notification
    return null;
  }

  /**
   * Update user's phone number.
   */
  static async updatePhone(
    params: UpdateProfile<{ phone: string }>,
    transaction?: Transaction
  ) {
    const user = await db.User.findByPk(params.userId);
    user.setDataValue('phone', params.phone);
    await user.save({ transaction });
  }

  /**
   * Update user's email address.
   */
  static async updateEmail(
    params: UpdateProfile<{ email: string }>,
    transaction?: Transaction
  ) {
    const user = await db.User.findByPk(params.userId);
    user.setDataValue('email', params.email);
    await user.save({ transaction });
  }

  /**
   * Update user's full name.
   */
  static async updateFullname(
    params: UpdateProfile<{ fullname: string }>,
    transaction?: Transaction
  ) {
    const user = await db.User.findByPk(params.userId);
    user.setDataValue('fullname', params.fullname);
    await user.save({ transaction });
  }

  /**
   * Update user's avatar.
   */
  static async updateAvatar(
    params: UpdateProfile<{ avatar: Nullable<string> }>,
    transaction?: Transaction
  ) {
    const user = await db.User.findByPk(params.userId);
    user.setDataValue('avatar', params.avatar);
    await user.save({ transaction });
  }
}

export default UserService;
