import { Transaction } from 'sequelize';
import resources from 'core/data/lcp';
import db from 'core/data/models';

import { PostTypeEnum } from '@ultras/utils';
import { PostCreationAttributes } from 'core/data/models/Post';

import BaseService, { RelationGroupType } from './BaseService';
import FanClubService from './FanClubService';
import MatchService from './MatchService';

export interface ICreateParams {
  image?: Nullable<string>;
  authorId: ResourceIdentifier;
  title: string;
  content: string;
  fanClubId?: ResourceIdentifier;
  matchId?: ResourceIdentifier;
  type: PostTypeEnum;
}

export interface IUpdateParams {
  image?: Nullable<string>;
  title: string;
  content: string;
}

export const defaultRelations: RelationGroupType = ['fanClub', 'match', 'author'];

class PostService extends BaseService {
  protected static includeRelations(
    relations: RelationGroupType = defaultRelations,
    args: any = {}
  ) {
    const includeRelations = [];

    if (this.isRelationIncluded(relations, 'fanClub')) {
      const relationsHierarchy = this.getRelationsHierarchy(relations, {
        fanClub: ['city', 'country', 'team', 'owner'],
      });

      includeRelations.push({
        model: db.FanClub,
        as: resources.FAN_CLUB.ALIAS.SINGULAR,
        ...FanClubService.getIncludeRelations(relationsHierarchy),
      });
    }

    if (this.isRelationIncluded(relations, 'match')) {
      includeRelations.push({
        model: db.Match,
        as: resources.MATCH.ALIAS.SINGULAR,
        ...MatchService.getIncludeRelations(),
      });
    }

    if (this.isRelationIncluded(relations, 'author')) {
      includeRelations.push({
        model: db.User,
        as: 'author',
      });
    }

    const attributes = [];

    if (args.userId) {
      attributes.push([
        db.Sequelize.literal(`
          EXISTS (
            SELECT 1
            FROM "${resources.ULTRAS_CORE}"."${resources.POST_MEMBER.RELATION}"
            WHERE (
              "deletedAt" IS NULL AND
              "userId" = ${args.userId} AND
              "postId" = "${resources.POST.ALIAS.SINGULAR}"."id"
            )
          )
        `),
        'joined',
      ]);

      attributes.push([
        db.Sequelize.literal(`
          EXISTS (
            SELECT 1
            FROM "${resources.ULTRAS_CORE}"."${resources.CATCH.RELATION}"
            WHERE (
              "deletedAt" IS NULL AND
              "userId" = ${args.userId} AND
              "postId" = "${resources.POST.ALIAS.SINGULAR}"."id"
            )
          )
        `),
        'caught',
      ]);
    }

    return {
      include: includeRelations,
      attributes: {
        include: attributes,
      },
      include: [
        {
          model: db.FanClub,
          as: resources.FAN_CLUB.ALIAS.SINGULAR,
          ...FanClubService.getIncludeRelations(),
        },
        {
          model: db.Match,
          as: resources.MATCH.ALIAS.SINGULAR,
          ...MatchService.getIncludeRelations({ userId: args.userId }),
        },
        {
          model: db.User,
          as: 'author',
        },
      ],
    };
  }

  /**
   * Create post instance.
   */
  static async create(
    { image, authorId, title, content, fanClubId, matchId, type }: ICreateParams,
    transaction?: Transaction
  ) {
    const postData: PostCreationAttributes = {
      image: image || null,
      type,
      authorId,
      matchId: matchId || null,
      fanClubId: fanClubId || null,
      title,
      content,
    };

    const post = await db.Post.create(postData, { transaction });
    return post;
  }

  /**
   * Update post.
   */
  static async update(
    postId: ResourceIdentifier,
    { image, title, content }: IUpdateParams,
    transaction?: Transaction
  ) {
    const post = await db.Post.findOne({
      where: {
        id: postId,
      },
    });

    await post.update(
      {
        image,
        title,
        content,
      },
      { transaction }
    );

    return post;
  }

  /**
   * Delete post.
   */
  static delete(id: ResourceIdentifier, transaction?: Transaction) {
    return db.Post.destroy({
      where: { id },
      transaction,
    });
  }

  /**
   * Get post by id.
   */
  static async getById(id: ResourceIdentifier, withIncludes = true) {
    const options = {
      where: {
        id: id,
      },
      ...(withIncludes ? this.includeRelations() : {}),
    };

    const event = await db.Post.findOne(options);

    return event;
  }

  /**
   * Increment catches count of post.
   */
  static async incrementCatches(id: ResourceIdentifier, transaction?: Transaction) {
    await db.Post.increment('catchesCount', {
      by: 1,
      where: { id: id },
      transaction,
    });
  }

  /**
   * Decrement catches count of post.
   */
  static async decrementCatches(id: ResourceIdentifier, transaction?: Transaction) {
    await db.Post.decrement('catchesCount', {
      by: 1,
      where: { id: id },
      transaction,
    });
  }

  /**
   * Increment comments count of post.
   */
  static async incrementComments(id: ResourceIdentifier, transaction?: Transaction) {
    await db.Post.increment('commentsCount', {
      by: 1,
      where: { id: id },
      transaction,
    });
  }

  /**
   * Decrement comments count of post.
   */
  static async decrementComments(id: ResourceIdentifier, transaction?: Transaction) {
    await db.Post.decrement('commentsCount', {
      by: 1,
      where: { id: id },
      transaction,
    });
  }
}

export default PostService;
