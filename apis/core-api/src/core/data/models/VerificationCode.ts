import { Model, Optional, Sequelize, DataTypes } from 'sequelize';
import { DbIdentifier } from 'types';
import { NotifiedProviderEnum } from '@ultras/utils';

import resources from 'core/data/lcp';
import schemas, { ULTRAS_CORE } from 'core/data/lcp/schemas';

export interface VerificationCodeAttributes {
  id: DbIdentifier;
  code: string;
  provider: NotifiedProviderEnum;
  phone: null | string;
  email: null | string;
  expirationTimestamp: number;
}

export type VerificationCodeCreationAttributes = Optional<
  VerificationCodeAttributes,
  'id' | 'phone' | 'email'
>;

export class VerificationCode
  extends Model<VerificationCodeAttributes, VerificationCodeCreationAttributes>
  implements VerificationCodeAttributes
{
  // Note that the `null assertion` `!` is required in strict mode.
  public id!: DbIdentifier;
  public code!: string;
  public provider!: NotifiedProviderEnum;
  public phone!: null | string;
  public email!: null | string;
  public expirationTimestamp!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // associated properties

  // associations

  static associate(models: any) {
    // ...
  }
}

module.exports = (sequelize: Sequelize): typeof VerificationCode => {
  VerificationCode.init(
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      provider: {
        type: DataTypes.ENUM({
          values: [NotifiedProviderEnum.email, NotifiedProviderEnum.sms],
        }),
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      expirationTimestamp: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
    },
    {
      tableName: resources.VERIFICATION_CODE.RELATION,
      schema: ULTRAS_CORE,
      timestamps: true,
      freezeTableName: true,
      paranoid: true,
      sequelize,
    }
  );

  return VerificationCode;
};
