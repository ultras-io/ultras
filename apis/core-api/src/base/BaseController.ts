import { SomethingWentWrong } from 'modules/exceptions';

abstract class BaseController {
  protected static riseSomethingWrong(exception: Error, message?: string) {
    throw new SomethingWentWrong({
      message: message || exception?.message,
      originalMessage: exception?.message,
    });
  }

  protected static sendSuccessStatus(isSuccess = true) {
    return {
      data: {
        success: isSuccess,
      },
    };
  }

  protected static sendFailureStatus() {
    return this.sendSuccessStatus(false);
  }
}

export default BaseController;
