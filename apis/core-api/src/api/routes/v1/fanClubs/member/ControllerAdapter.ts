import FanClubMembershipController from 'core/controllers/FanClubMembershipController';

import { Context } from 'types';

class ControllerAdapter {
  static async requestJoin(ctx: Context): Promise<void> {
    /** VALIDATIONS, PARAMETERS */
    const fanClubIdParam = ctx.request.params.fanClubId;
    const fanClubIdBody = ctx.request.body.fanClubId;
    const { userId } = ctx.user;

    /** CONTROLLERS */
    const { data } = await FanClubMembershipController.requestJoin({
      fanClubId: fanClubIdParam || fanClubIdBody,
      memberId: userId,
    });

    /** RESPONSE */
    // @TODO make response types
    const response = {
      data,
    };

    return ctx.created(response);
  }

  static async getAll(ctx: Context) {
    /** VALIDATIONS, PARAMETERS */
    const params = ctx.request.query;
    const { userId } = ctx.user;

    /** CONTROLLERS */
    const { data, limit, offset, count } =
      await FanClubMembershipController.getByMemberId({
        ...params,
        memberId: userId,
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

  static async leave(ctx: Context) {
    /** VALIDATIONS, PARAMETERS */
    const { fanClubId, id } = ctx.request.params;
    const { userId } = ctx.user;

    /** CONTROLLERS */
    const { data } = await FanClubMembershipController.leave({
      fanClubId,
      membershipId: id,
      memberId: userId,
    });

    /** RESPONSE */
    // @TODO make response types
    const response = {
      data,
    };

    return ctx.ok(response);
  }

  static async acceptInvitation(ctx: Context) {
    /** VALIDATIONS, PARAMETERS */
    const { fanClubId, id } = ctx.request.params;
    const { userId } = ctx.user;

    /** CONTROLLERS */
    const { data } = await FanClubMembershipController.acceptInvitation({
      fanClubId,
      membershipId: id,
      memberId: userId,
    });

    /** RESPONSE */
    // @TODO make response types
    const response = {
      data,
    };

    return ctx.ok(response);
  }

  static async rejectInvitation(ctx: Context) {
    /** VALIDATIONS, PARAMETERS */
    const { fanClubId, id } = ctx.request.params;
    const { userId } = ctx.user;

    /** CONTROLLERS */
    const { data } = await FanClubMembershipController.rejectInvitation({
      fanClubId,
      membershipId: id,
      memberId: userId,
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
