import { FanClubMemberRoleEnum, FanClubMemberStatusEnum } from '@ultras/utils';
import BaseController from 'core/controllers/BaseController';
import { CityService, FanClubService } from 'core/services';
import { ResourceNotFoundError } from 'modules/exceptions';
import {
  FanClubCreateParams,
  FanClubCreateResult,
  FanClubUpdateParams,
  FanClubUpdateResult,
} from './types';

class UserController extends BaseController {
  static async create({
    creatorId,
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
      avatar,
      coverPhoto,
      privacy,
    });

    await FanClubService.addMember({
      fanClubId: fanClub.getDataValue('id'),
      userId: creatorId,
      role: FanClubMemberRoleEnum.admin,
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
}

export default UserController;
