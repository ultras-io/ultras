import { Transaction } from 'sequelize';
import resources from 'core/data/lcp';
import db from 'core/data/models';

import { PostTypeEnum } from '@ultras/utils';
import { PostCreationAttributes } from 'core/data/models/Post';

import BaseService from './BaseService';
import FanClubService from './FanClubService';
import MatchService from './MatchService';

export interface CreateParamsInterface {
  image?: Nullable<string>;
  authorId: ResourceIdentifier;
  title: string;
  content: string;
  fanClubId?: ResourceIdentifier;
  matchId?: ResourceIdentifier;
  type: PostTypeEnum;
}

export interface UpdateParamsInterface {
  image?: Nullable<string>;
  title: string;
  content: string;
}

class PostService extends BaseService {
  protected static includeRelations() {
    return {
      attributes: {
        // exclude: ['fanClubId', 'matchId', 'authorId'],
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
          ...MatchService.getIncludeRelations(),
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
    { image, authorId, title, content, fanClubId, matchId, type }: CreateParamsInterface,
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
      likesCount: 0,
      commentsCount: 0,
    };

    const post = await db.Post.create(postData, { transaction });
    return post;
  }

  /**
   * Update post.
   */
  static async update(
    postId: ResourceIdentifier,
    { image, title, content }: UpdateParamsInterface,
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
    const event = await db.Post.findOne({
      where: {
        id: id,
      },
      ...(withIncludes ? this.includeRelations() : {}),
    });

    return event;
  }
}

export default PostService;
