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
import PostService from './PostService';
import MatchService from './MatchService';

interface ICommentBasicParams {
  resourceType: CommentTypeEnum;
  resourceId: ResourceIdentifier;
}

interface ICommentCreateParams extends ICommentBasicParams {
  userId: ResourceIdentifier;
  content: string;
}
interface ICommentUpdateParams extends ICommentBasicParams {
  userId: ResourceIdentifier;
  content: string;
  commentId: ResourceIdentifier;
}
interface ICommentDeleteParams extends ICommentBasicParams {
  userId: ResourceIdentifier;
  commentId: ResourceIdentifier;
}

interface IFieldsByType {
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

  private static getFieldsByType(resourceType: CommentTypeEnum): IFieldsByType {
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
    params: ServiceListParamsType<ICommentBasicParams>
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
  static async comment(params: ICommentCreateParams, transaction?: Transaction) {
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

    if (params.resourceType === CommentTypeEnum.post) {
      await PostService.incrementComments(params.resourceId, transaction);
    } else if (params.resourceType === CommentTypeEnum.match) {
      await MatchService.incrementComments(params.resourceId, transaction);
    }

    return this.getById(comment.getDataValue('id'));
  }

  /**
   * Update comment under resource.
   */
  static async update(params: ICommentUpdateParams, transaction?: Transaction) {
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
  static async uncomment(params: ICommentDeleteParams, transaction?: Transaction) {
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

    if (params.resourceType === CommentTypeEnum.post) {
      await PostService.decrementComments(params.resourceId, transaction);
    } else if (params.resourceType === CommentTypeEnum.match) {
      await MatchService.decrementComments(params.resourceId, transaction);
    }
  }
}

export default CommentService;
