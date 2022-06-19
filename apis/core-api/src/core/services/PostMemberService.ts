import { Transaction } from 'sequelize';

import resources from 'core/data/lcp';
import db from 'core/data/models';
import { PostMemberCreationAttributes } from 'core/data/models/PostMember';
import { ServiceListParamsType } from 'types';

import PostService from './PostService';
import UserService from './UserService';

import BaseService from './BaseService';

export interface CreateParamsInterface {
  userId: ResourceIdentifier;
  postId: ResourceIdentifier;
}

export interface FindParamsInterface {
  userId: ResourceIdentifier;
  postId: ResourceIdentifier;
}

export interface FindAllParamsInterface {
  postId: ResourceIdentifier;
  search?: string;
}

export interface DeleteParamsInterface {
  userId: ResourceIdentifier;
  postId: ResourceIdentifier;
}

class PostMemberService extends BaseService {
  protected static includeRelations() {
    return {
      attributes: {
        exclude: ['postId', 'userId'],
      },
      include: [
        {
          model: db.Post,
          as: resources.POST.ALIAS.SINGULAR,
          ...PostService.getIncludeRelations(),
        },
        {
          model: db.User,
          as: resources.USER.ALIAS.SINGULAR,
          ...UserService.getIncludeRelations(),
        },
      ],
    };
  }

  /**
   * Create post member instance.
   */
  static async create(
    { postId, userId }: CreateParamsInterface,
    transaction?: Transaction
  ) {
    const postData: PostMemberCreationAttributes = {
      userId,
      postId,
    };

    const post = await db.PostMember.create(postData, { transaction });
    return post;
  }

  /**
   * Delete post member.
   */
  static delete({ postId, userId }: DeleteParamsInterface, transaction?: Transaction) {
    return db.PostMember.destroy(
      {
        where: {
          postId,
          userId,
        },
        force: true,
      },
      { transaction }
    );
  }

  /**
   * Get post member.
   */
  static getOne({ postId, userId }: FindParamsInterface) {
    return db.PostMember.findOne({
      where: {
        postId,
        userId,
      },
    });
  }

  /**
   * Get all post member.
   */
  static async getAll(params: ServiceListParamsType<FindAllParamsInterface>) {
    // build generic query options
    const queryOptions: any = {
      limit: params.limit,
      offset: params.offset,
      where: {},
      ...this.includeRelations(),
    };

    if (params.search) {
      // remove user relation
      queryOptions.include = queryOptions.include.filter(
        (include: any) => include.as != resources.USER.ALIAS.SINGULAR
      );

      const searchCondition = ['email', 'username', 'fullname'].map(field => ({
        [field]: {
          [db.Sequelize.Op.iLike]: `%${params.search}%`,
        },
      }));

      // add user relation with search conditions
      queryOptions.include.push({
        model: db.User,
        as: resources.USER.ALIAS.SINGULAR,
        required: true,
        where: searchCondition,
      });
    }

    const { rows, count } = await db.PostMember.findAndCountAll(queryOptions);
    return { rows, count };
  }
}

export default PostMemberService;
