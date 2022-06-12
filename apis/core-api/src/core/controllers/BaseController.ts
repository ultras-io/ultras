import BaseService, { WithTransactionCallback } from 'core/services/BaseService';
import { SomethingWentWrong } from 'modules/exceptions';

abstract class BaseController {
  protected static riseSomethingWrong(exception: null | Error, message?: string) {
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

  protected static withTransaction(callback: WithTransactionCallback) {
    return BaseService.withTransaction(callback);
  }
}

export default BaseController;
