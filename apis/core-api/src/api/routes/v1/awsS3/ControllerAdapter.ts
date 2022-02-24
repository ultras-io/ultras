import AwsS3Controller from 'core/controllers/AwsS3Controller';

import { Context } from 'types';

class ControllerAdapter {
  static async getSignedUrl(ctx: Context): Promise<void> {
    /** VALIDATIONS, PARAMETERS */
    const { folder, extension } = ctx.request.query;

    /** CONTROLLERS */
    const { data } = await AwsS3Controller.getSignedUrl({ folder, extension });

    /** RESPONSE */
    // @TODO make response types
    const response = {
      data,
    };

    return ctx.created(response);
  }
}

export default ControllerAdapter;
