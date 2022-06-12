import { Transaction } from 'sequelize';
import resources from 'core/data/lcp';
import db from 'core/data/models';

import { PostTypeEnum } from '@ultras/utils';
import { PostCreationAttributes } from 'core/data/models/Post';

import BaseService from './BaseService';
import FanClubService from './FanClubService';
import MatchService from './MatchService';

export interface CreateParamsInterface {
  authorId: ResourceIdentifier;
  title: string;
  content: string;
  fanClubId?: ResourceIdentifier;
  matchId?: ResourceIdentifier;
}

export interface UpdateParamsInterface {
  title: string;
  content: string;
}

class PostService extends BaseService {
  protected static includeRelations() {
    return {
      attributes: {
        exclude: ['fanClubId', 'matchId', 'authorId'],
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
  static async create({
    authorId,
    title,
    content,
    fanClubId,
    matchId,
  }: CreateParamsInterface) {
    const postData: PostCreationAttributes = {
      type: PostTypeEnum.event,
      authorId: authorId,
      matchId: matchId || null,
      fanClubId: fanClubId || null,
      title: title,
      content: content,
      likesCount: 0,
      commentsCount: 0,
    };

    const post = await db.Post.create(postData);
    return post;
  }

  /**
   * Update post.
   */
  static async update(
    postId: ResourceIdentifier,
    { title, content }: UpdateParamsInterface
  ) {
    const post = await db.Post.findOne({
      where: {
        id: postId,
      },
    });

    await post.update({
      title,
      content,
    });

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
}

export default PostService;
