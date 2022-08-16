import { Transaction } from 'sequelize';
import { CommentTypeEnum } from '@ultras/utils';
import type { CommentViewModel } from '@ultras/view-models';
import type {
  ServiceListParamsType,
  ServiceListResultType,
  ServiceResultType,
} from 'types';

import resources from 'core/data/lcp';
import db from 'core/data/models';
import BaseService from './BaseService';

interface CommentBasicParamsInterface {
  resourceType: CommentTypeEnum;
  resourceId: ResourceIdentifier;
}

interface CommentCreateParamsInterface extends CommentBasicParamsInterface {
  userId: ResourceIdentifier;
  content: string;
}
interface CommentUpdateParamsInterface extends CommentBasicParamsInterface {
  userId: ResourceIdentifier;
  content: string;
  commentId: ResourceIdentifier;
}
interface CommentDeleteParamsInterface extends CommentBasicParamsInterface {
  userId: ResourceIdentifier;
  commentId: ResourceIdentifier;
}

interface FieldsByTypeInterface {
  fieldId: string;
  aliasName: string;
  model: any;
}

class CommentService extends BaseService {
  protected static includeRelations() {
    return {
      attributes: {
        exclude: ['type', 'userId', 'postId', 'matchId'],
      },
      include: [
        {
          required: true,
          as: resources.USER.ALIAS.SINGULAR,
          model: db.User,
        },
      ],
    };
  }

  private static getFieldsByType(resourceType: CommentTypeEnum): FieldsByTypeInterface {
    switch (resourceType) {
      case CommentTypeEnum.match:
        return {
          fieldId: 'matchId',
          aliasName: resources.MATCH.ALIAS.SINGULAR,
          model: db.Match,
        };
      case CommentTypeEnum.post:
        return {
          fieldId: 'postId',
          aliasName: resources.POST.ALIAS.SINGULAR,
          model: db.Post,
        };
    }
  }

  /**
   * Get commenters by resource type, id and pagination.
   */
  static async getAll(
    params: ServiceListParamsType<CommentBasicParamsInterface>
  ): ServiceListResultType<CommentViewModel> {
    const { fieldId } = this.getFieldsByType(params.resourceType);

    const comments = await db.Comment.findAll({
      ...this.includeRelations(),
      where: {
        [fieldId]: params.resourceId,
      },
      order: [[params.orderAttr, params.order]],
      limit: params.limit,
      offset: params.offset,
    });

    return comments;
  }

  /**
   * Get comment by comment id.
   */
  static async getById(
    id: ResourceIdentifier
  ): ServiceResultType<CommentViewModel | null> {
    return this.findById(db.Comment, id);
  }

  /**
   * Add comment under resource.
   */
  static async comment(params: CommentCreateParamsInterface, transaction?: Transaction) {
    const { fieldId } = this.getFieldsByType(params.resourceType);

    const comment = await db.Comment.create(
      {
        type: params.resourceType,
        userId: params.userId,
        content: params.content,
        [fieldId]: params.resourceId,
      },
      { transaction }
    );

    return this.getById(comment.getDataValue('id'));
  }

  /**
   * Update comment under resource.
   */
  static async update(params: CommentUpdateParamsInterface, transaction?: Transaction) {
    const { fieldId } = this.getFieldsByType(params.resourceType);

    await db.Comment.update(
      {
        content: params.content,
        edited: true,
      },
      {
        where: {
          type: params.resourceType,
          userId: params.userId,
          id: params.commentId,
          [fieldId]: params.resourceId,
        },
        transaction,
      }
    );

    return this.getById(params.commentId);
  }

  /**
   * Remove comment.
   */
  static async uncomment(
    params: CommentDeleteParamsInterface,
    transaction?: Transaction
  ) {
    const { fieldId } = this.getFieldsByType(params.resourceType);

    await db.Comment.destroy(
      {
        where: {
          type: params.resourceType,
          userId: params.userId,
          id: params.commentId,
          [fieldId]: params.resourceId,
        },
        force: true,
      },
      { transaction }
    );
  }
}

export default CommentService;
