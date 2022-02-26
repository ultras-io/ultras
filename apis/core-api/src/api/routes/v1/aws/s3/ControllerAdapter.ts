import S3Controller from 'core/controllers/aws/S3Controller';

import { Context } from 'types';

class ControllerAdapter {
  static async getSignedUrl(ctx: Context): Promise<void> {
    /** VALIDATIONS, PARAMETERS */
    const { folder, extension } = ctx.request.query;

    /** CONTROLLERS */
    const { data } = await S3Controller.getSignedUrl({ folder, extension });

    /** RESPONSE */
    // @TODO make response types
    const response = {
      data,
    };

    return ctx.created(response);
  }
}

export default ControllerAdapter;
