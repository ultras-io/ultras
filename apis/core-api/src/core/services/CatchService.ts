import { Transaction } from 'sequelize';
import { CatchTypeEnum } from '@ultras/utils';
import type { UserViewModel } from '@ultras/view-models';
import type { ServiceListParamsType, ServiceListResultType } from 'types';

import resources from 'core/data/lcp';
import db from 'core/data/models';
import BaseService from './BaseService';
import PostService from './PostService';
import MatchService from './MatchService';

interface ICatchBasicParams {
  resourceType: CatchTypeEnum;
  resourceId: ResourceIdentifier;
}

interface ICatchUncatchParams extends ICatchBasicParams {
  userId: ResourceIdentifier;
}

interface IFieldsByType {
  fieldId: string;
  throughAlias: string;
  model: any;
}

class CatchService extends BaseService {
  private static getFieldsByType(resourceType: CatchTypeEnum): IFieldsByType {
    switch (resourceType) {
      case CatchTypeEnum.match:
        return {
          fieldId: 'matchId',
          throughAlias: resources.LIKE.ALIAS.PLURAL + 'Match',
          model: db.Match,
        };
      case CatchTypeEnum.post:
        return {
          fieldId: 'postId',
          throughAlias: resources.LIKE.ALIAS.PLURAL + 'Post',
          model: db.Post,
        };
    }
  }

  /**
   * Get catches by resource type, id and pagination.
   */
  static async getAll(
    params: ServiceListParamsType<ICatchBasicParams>
  ): ServiceListResultType<UserViewModel> {
    const { fieldId, throughAlias, model } = this.getFieldsByType(params.resourceType);

    const catchers = await db.User.findAll({
      include: [
        {
          required: true,
          model: model,
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
      limit: params.limit,
      offset: params.offset,
    });

    return catchers;
  }

  /**
   * Make resource caught by user.
   */
  static async catch(params: ICatchUncatchParams, transaction?: Transaction) {
    const { fieldId } = this.getFieldsByType(params.resourceType);

    await db.Catch.create(
      {
        type: params.resourceType,
        userId: params.userId,
        [fieldId]: params.resourceId,
      },
      { transaction }
    );

    if (params.resourceType === CatchTypeEnum.post) {
      await PostService.incrementCatches(params.resourceId, transaction);
    } else if (params.resourceType === CatchTypeEnum.match) {
      await MatchService.incrementCatches(params.resourceId, transaction);
    }
  }

  /**
   * Make resource uncaught by user.
   */
  static async uncatch(params: ICatchUncatchParams, transaction?: Transaction) {
    const { fieldId } = this.getFieldsByType(params.resourceType);

    await db.Catch.destroy(
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

    if (params.resourceType === CatchTypeEnum.post) {
      await PostService.decrementCatches(params.resourceId, transaction);
    } else if (params.resourceType === CatchTypeEnum.match) {
      await MatchService.decrementCatches(params.resourceId, transaction);
    }
  }
}

export default CatchService;
