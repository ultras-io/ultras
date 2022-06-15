import { Transaction } from 'sequelize';
import { ResourceIdentifier } from 'types';
import { RoomPrivacyEnum } from '@ultras/utils';
import { RoomViewModel } from '@ultras/view-models';

import resources from 'core/data/lcp';
import db from 'core/data/models';
import { RoomCreationAttributes } from 'core/data/models/Room';

import BaseService from './BaseService';
import LocationService from './LocationService';
import PostService from './PostService';

export interface CreateParamsInterface {
  privacy: RoomPrivacyEnum;
  postId: ResourceIdentifier;
}

class RoomService extends BaseService {
  protected static includeRelations() {
    return {
      attributes: {
        exclude: ['postId'],
      },
      include: [
        {
          model: db.Post,
          as: resources.POST.ALIAS.SINGULAR,
          ...PostService.getIncludeRelations(),
        },
        {
          model: db.Location,
          as: resources.LOCATION.ALIAS.SINGULAR,
          ...LocationService.getIncludeRelations(),
        },
      ],
    };
  }

  /**
   * Create room instance.
   */
  static async create(
    { privacy, postId }: CreateParamsInterface,
    transaction?: Transaction
  ): Promise<RoomViewModel> {
    const roomData: RoomCreationAttributes = {
      postId: postId,
      privacy,
    };

    const room = await db.Room.create(roomData, { transaction });

    return room;
  }
}

export default RoomService;
