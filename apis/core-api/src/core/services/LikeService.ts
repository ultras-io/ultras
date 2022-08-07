import { Transaction } from 'sequelize';
import { LikeTypeEnum } from '@ultras/utils';
import type { UserViewModel } from '@ultras/view-models';
import type { ServiceListParamsType, ServiceListResultType } from 'types';

import resources from 'core/data/lcp';
import db from 'core/data/models';
import BaseService from './BaseService';

interface LikeBasicParamsInterface {
  resourceType: LikeTypeEnum;
  resourceId: ResourceIdentifier;
}

interface LikeUnlikeParamsInterface extends LikeBasicParamsInterface {
  userId: ResourceIdentifier;
}

interface FieldsByTypeInterface {
  fieldId: string;
  throughAlias: string;
}

class LikeService extends BaseService {
  private static getFieldsByType(resourceType: LikeTypeEnum): FieldsByTypeInterface {
    switch (resourceType) {
      case LikeTypeEnum.match:
        return {
          fieldId: 'matchId',
          throughAlias: resources.LIKE.ALIAS.PLURAL + 'Match',
        };
      case LikeTypeEnum.post:
        return {
          fieldId: 'postId',
          throughAlias: resources.LIKE.ALIAS.PLURAL + 'Post',
        };
    }
  }

  /**
   * Get likes by resource type, id and pagination.
   */
  static async getAll(
    params: ServiceListParamsType<LikeBasicParamsInterface>
  ): ServiceListResultType<UserViewModel> {
    const { fieldId, throughAlias } = this.getFieldsByType(params.resourceType);

    const likers = await db.User.findAll({
      include: [
        {
          required: true,
          model: db.Post,
          as: throughAlias,
          attributes: [],
          through: {
            attributes: [],
            where: {
              [fieldId]: params.resourceId,
            },
          },
        },
      ],
      order: [[params.orderAttr, params.order]],
    });

    return likers;
  }

  /**
   * Make resource liked by user.
   */
  static async like(params: LikeUnlikeParamsInterface, transaction?: Transaction) {
    const { fieldId } = this.getFieldsByType(params.resourceType);

    await db.Like.create(
      {
        type: params.resourceType,
        userId: params.userId,
        [fieldId]: params.resourceId,
      },
      { transaction }
    );
  }

  /**
   * Make resource un-liked by user.
   */
  static async unlike(params: LikeUnlikeParamsInterface, transaction?: Transaction) {
    const { fieldId } = this.getFieldsByType(params.resourceType);

    await db.Like.destroy(
      {
        where: {
          type: params.resourceType,
          userId: params.userId,
          [fieldId]: params.resourceId,
        },
        force: true,
      },
      { transaction }
    );
  }
}

export default LikeService;
