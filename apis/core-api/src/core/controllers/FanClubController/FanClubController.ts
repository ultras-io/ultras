import { OrderEnum, FanClubMemberRoleEnum, FanClubMemberStatusEnum } from '@ultras/utils';
import BaseController from 'core/controllers/BaseController';
import { CityService, FanClubService } from 'core/services';
import { ResourceNotFoundError } from 'modules/exceptions';

import { DEFAULT_PAGINATION_ATTRIBUTES } from '@constants';
import { DbIdentifier } from 'types';
import {
  FanClubCreateParams,
  FanClubCreateResult,
  FanClubUpdateParams,
  FanClubUpdateResult,
  FanClubsListParams,
  FanClubsListResult,
  FanClubByIdResult,
} from './types';

class UserController extends BaseController {
  static async create({
    ownerId,
    name,
    description,
    cityId,
    teamId,
    avatar,
    coverPhoto,
    privacy,
  }: FanClubCreateParams): FanClubCreateResult {
    const city: any = await CityService.getById(cityId);
    if (!city) {
      throw new ResourceNotFoundError({
        message: 'City not found.',
      });
    }

    const countryId = city.getDataValue('country').getDataValue('id');
    const fanClub = await FanClubService.create({
      name,
      description,
      cityId,
      countryId,
      teamId,
      ownerId,
      avatar,
      coverPhoto,
      privacy,
    });

    await FanClubService.addMember({
      fanClubId: fanClub.getDataValue('id'),
      userId: ownerId,
      role: FanClubMemberRoleEnum.owner,
      status: FanClubMemberStatusEnum.active,
    });

    return {
      data: {
        fanClub: fanClub,
      },
    };
  }

  static async update({
    id,
    name,
    description,
    cityId,
    avatar,
    coverPhoto,
    privacy,
  }: FanClubUpdateParams): FanClubUpdateResult {
    const update: any = {
      name,
      description,
      avatar,
      coverPhoto,
      privacy,
    };

    if (cityId) {
      const city: any = await CityService.getById(cityId);
      if (!city) {
        throw new ResourceNotFoundError({
          message: 'City not found.',
        });
      }

      const countryId = city.getDataValue('country').getDataValue('id');
      update.cityId = cityId;
      update.countryId = countryId;
    }

    update.cityId = null;
    update.countryId = null;
    const fanClub = await FanClubService.update(id, update);

    return {
      data: {
        fanClub: fanClub,
      },
    };
  }

  static async getAll({
    limit = DEFAULT_PAGINATION_ATTRIBUTES.LIMIT,
    offset = DEFAULT_PAGINATION_ATTRIBUTES.OFFSET,
    orderAttr = 'name',
    order = OrderEnum.asc,
    name,
    cityId,
    countryId,
    teamId,
  }: FanClubsListParams): FanClubsListResult {
    const { rows, count } = await FanClubService.getAll({
      limit,
      offset,
      orderAttr,
      order,
      name,
      cityId,
      countryId,
      teamId,
    });

    return {
      data: rows,
      count,
      limit,
      offset,
    };
  }

  static async getById(id: DbIdentifier): FanClubByIdResult {
    const fanClub = await FanClubService.getById(id);

    if (!fanClub) {
      throw new ResourceNotFoundError({
        message: 'Fan club not found.',
      });
    }

    return {
      data: fanClub,
    };
  }
}

export default UserController;
