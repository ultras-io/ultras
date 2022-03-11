import FanClubMembershipController from 'core/controllers/FanClubMembershipController';
import { InvalidUserInput } from 'modules/exceptions';

import { Context } from 'types';

class ControllerAdapter {
  static async invite(ctx: Context): Promise<void> {
    /** VALIDATIONS, PARAMETERS */
    const { fanClubId } = ctx.request.params;
    const invitations = ctx.request.body;
    const { userId } = ctx.user;

    /** CONTROLLERS */
    const { data } = await FanClubMembershipController.invite({
      fanClubId,
      inviterId: userId,
      invitations,
    });

    /** RESPONSE */
    // @TODO make response types
    const response = {
      data,
    };

    return ctx.created(response);
  }

  static async remove(ctx: Context): Promise<void> {
    /** VALIDATIONS, PARAMETERS */
    const { fanClubId } = ctx.request.params;
    const { ids, memberIds } = ctx.request.query;

    const membershipIdList = !ids ? [] : ids.split(',');
    const memberIdList = !memberIds ? [] : memberIds.split(',');

    if (membershipIdList.length == 0 && memberIds.length == 0) {
      throw new InvalidUserInput({
        message: 'Membership or member id(s) must be provided.',
        fields: {
          ids: 'Membership id list',
          memberIds: 'Member id list',
        },
      });
    }

    /** CONTROLLERS */
    await FanClubMembershipController.removeMember({
      fanClubId,
      membershipId: membershipIdList,
      memberId: memberIdList,
    });

    /** RESPONSE */
    return ctx.noContent();
  }

  static async removeById(ctx: Context): Promise<void> {
    /** VALIDATIONS, PARAMETERS */
    const { fanClubId, id } = ctx.request.params;

    /** CONTROLLERS */
    await FanClubMembershipController.removeMemberById({
      fanClubId,
      membershipId: id,
    });

    /** RESPONSE */
    return ctx.noContent();
  }

  static async getAll(ctx: Context) {
    /** VALIDATIONS, PARAMETERS */
    const { fanClubId } = ctx.request.params;
    const params = ctx.request.query;

    /** CONTROLLERS */
    const { data, limit, offset, count } = await FanClubMembershipController.getAll({
      ...params,
      fanClubId,
    });

    /** RESPONSE */
    // @TODO make response types
    const response = {
      data,
      limit,
      offset,
      total: count,
    };

    return ctx.ok(response);
  }

  static async getById(ctx: Context): Promise<void> {
    /** VALIDATIONS, PARAMETERS */
    const { fanClubId, id } = ctx.request.params;

    /** CONTROLLERS */
    const { data } = await FanClubMembershipController.getById({
      fanClubId,
      membershipId: id,
    });

    /** RESPONSE */
    // @TODO make response types
    const response = {
      data,
    };

    return ctx.ok(response);
  }

  static async update(ctx: Context): Promise<void> {
    /** VALIDATIONS, PARAMETERS */
    const { fanClubId } = ctx.request.params;
    const updates = ctx.request.body;

    /** CONTROLLERS */
    const { data } = await FanClubMembershipController.update({
      fanClubId,
      updates,
    });

    /** RESPONSE */
    // @TODO make response types
    const response = {
      data,
    };

    return ctx.ok(response);
  }

  static async updateById(ctx: Context): Promise<void> {
    /** VALIDATIONS, PARAMETERS */
    const { fanClubId, id } = ctx.request.params;
    const { role, status } = ctx.request.body;

    /** CONTROLLERS */
    const { data } = await FanClubMembershipController.update({
      fanClubId,
      updates: {
        membershipId: id,
        role,
        status,
      },
    });

    /** RESPONSE */
    // @TODO make response types
    const response = {
      data,
    };

    return ctx.ok(response);
  }
}

export default ControllerAdapter;
