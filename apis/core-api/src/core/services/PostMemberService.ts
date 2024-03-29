import { Transaction } from 'sequelize';
import { OrderEnum } from '@ultras/utils';

import resources from 'core/data/lcp';
import db from 'core/data/models';
import { PostMemberCreationAttributes } from 'core/data/models/PostMember';
import { ServiceListParamsType } from 'types';

import PostService from './PostService';
import UserService from './UserService';

import BaseService, { RelationGroupType } from './BaseService';

export interface ICreateParams {
  userId: ResourceIdentifier;
  postId: ResourceIdentifier;
}

export interface IFindParams {
  userId: ResourceIdentifier;
  postId: ResourceIdentifier;
}

export interface IFindAllParams {
  postId: ResourceIdentifier;
  search?: string;
}

export interface IDeleteParams {
  userId: ResourceIdentifier;
  postId: ResourceIdentifier;
}

export const defaultRelations: RelationGroupType = ['post', 'user'];

class PostMemberService extends BaseService {
  protected static includeRelations(relations: RelationGroupType = defaultRelations) {
    relations = relations || defaultRelations;
    const includeRelations = [];

    if (this.isRelationIncluded(relations, 'post')) {
      const relationsHierarchy = this.getRelationsHierarchy(relations, {
        post: ['fanClub', 'match', 'author'],
      });

      includeRelations.push({
        model: db.Post,
        as: resources.POST.ALIAS.SINGULAR,
        ...PostService.getIncludeRelations(relationsHierarchy),
      });
    }

    if (this.isRelationIncluded(relations, 'user')) {
      includeRelations.push({
        model: db.User,
        as: resources.USER.ALIAS.SINGULAR,
        ...UserService.getIncludeRelations(),
      });
    }

    return {
      include: includeRelations,
    };
  }

  /**
   * Create post member instance.
   */
  static async create({ postId, userId }: ICreateParams, transaction?: Transaction) {
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
  static delete({ postId, userId }: IDeleteParams, transaction?: Transaction) {
    return db.PostMember.destroy(
      {
        force: true,
        where: {
          postId,
          userId,
        },
      },
      { transaction }
    );
  }

  /**
   * Get post member.
   */
  static getOne({ postId, userId }: IFindParams) {
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
  static async getAll(params: ServiceListParamsType<IFindAllParams>) {
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

    queryOptions.include.forEach((include: any) => {
      if (include.as === resources.POST.ALIAS.SINGULAR) {
        include.required = true;
        include.attributes = [];
        include.include = [];
      }
    });

    // set alphabetical ordering using user.fullname,
    // in case of user.fullname is empty we need to order
    // using user.username
    if (!queryOptions.order) {
      queryOptions.order = [
        [resources.USER.ALIAS.SINGULAR, 'fullname', OrderEnum.asc],
        [resources.USER.ALIAS.SINGULAR, 'username', OrderEnum.asc],
      ];
    }

    const { rows, count } = await db.PostMember.findAndCountAll(queryOptions);
    return { rows, count };
  }
}

export default PostMemberService;
