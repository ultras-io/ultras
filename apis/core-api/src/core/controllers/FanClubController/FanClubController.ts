import { OrderEnum, FanClubMemberRoleEnum, FanClubMemberStatusEnum } from '@ultras/utils';
import BaseController from 'core/controllers/BaseController';
import { CityService, FanClubMemberService, FanClubService } from 'core/services';
import { ResourceNotFoundError } from 'modules/exceptions';

import { DEFAULT_PAGINATION_ATTRIBUTES } from '@constants';
import { ResourceIdentifier } from 'types';
import {
  FanClubCreateParams,
  FanClubCreateResult,
  FanClubUpdateParams,
  FanClubUpdateResult,
  FanClubsListParams,
  FanClubsListResult,
  FanClubByIdResult,
} from './types';

class FanClubController extends BaseController {
  static async create({
    ownerId,
    shortName,
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

    const fanClub = await this.withTransaction(async transaction => {
      const countryId = city.getDataValue('country').getDataValue('id');
      const fanClub = await FanClubService.create(
        {
          shortName,
          name,
          description,
          cityId,
          countryId,
          teamId,
          ownerId,
          avatar,
          coverPhoto,
          privacy,
        },
        transaction
      );

      await FanClubMemberService.add(
        {
          fanClubId: fanClub.getDataValue('id'),
          memberId: ownerId,
          role: FanClubMemberRoleEnum.owner,
          status: FanClubMemberStatusEnum.active,
        },
        transaction
      );

      return fanClub;
    });

    return {
      data: fanClub,
    };
  }

  static async update({
    id,
    shortName,
    name,
    description,
    cityId,
    avatar,
    coverPhoto,
    privacy,
  }: FanClubUpdateParams): FanClubUpdateResult {
    const update: any = {
      shortName,
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
      data: fanClub,
    };
  }

  static async getAll({
    limit = DEFAULT_PAGINATION_ATTRIBUTES.LIMIT,
    offset = DEFAULT_PAGINATION_ATTRIBUTES.OFFSET,
    orderAttr = 'name',
    order = OrderEnum.asc,
    userId,
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
      userId,
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

  static async getById(id: ResourceIdentifier): FanClubByIdResult {
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

export default FanClubController;
