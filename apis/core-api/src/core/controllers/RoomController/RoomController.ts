import { PostTypeEnum } from '@ultras/utils';
import BaseController from 'core/controllers/BaseController';
import { RoomService, PostService } from 'core/services';

import { RoomCreateParams, RoomCreateResult } from './types';

class RoomController extends BaseController {
  /**
   * Add new room.
   */
  static async create(params: RoomCreateParams): RoomCreateResult {
    const room = await this.withTransaction(async transaction => {
      const post = await PostService.create(
        {
          authorId: params.authorId,
          fanClubId: params.fanClubId,
          title: params.title,
          content: params.content,
          type: PostTypeEnum.room,
        },
        transaction
      );

      const room = await RoomService.create(
        {
          postId: post.getDataValue('id'),
          privacy: params.privacy,
        },
        transaction
      );

      return room;
    });

    return {
      data: room,
    };
  }
}

export default RoomController;
