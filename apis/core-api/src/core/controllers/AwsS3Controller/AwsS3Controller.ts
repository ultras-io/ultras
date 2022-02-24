import { AwsS3ErrorEnum } from '@ultras/utils';
import { awsConfig } from 'config';
import BaseController from 'core/controllers/BaseController';
import AwsS3Service from 'core/services/AwsS3Service';
import {
  InvalidUserInput,
  RequiredParameterNotProvided,
  ServiceNotAvailableError,
} from 'modules/exceptions';

import { AwsS3SignedUrlParam, AwsS3SignedUrlResult } from './types';

class AwsS3Controller extends BaseController {
  static async getSignedUrl({
    folder,
    extension,
  }: AwsS3SignedUrlParam): AwsS3SignedUrlResult {
    if (!folder) {
      throw new RequiredParameterNotProvided({
        errorCode: AwsS3ErrorEnum.folderMissing,
        message: 'Parameter folder is required.',
      });
    }

    if (!extension) {
      throw new RequiredParameterNotProvided({
        errorCode: AwsS3ErrorEnum.extensionMissing,
        message: 'Parameter extension is required.',
      });
    }

    if (!awsConfig.allowedExtensions.includes(extension)) {
      throw new InvalidUserInput({
        errorCode: AwsS3ErrorEnum.extensionNotAllowed,
        message: 'Provided extension is not allowed.',
      });
    }

    try {
      const { putUrl, path } = await AwsS3Service.getSignedUrl(folder, extension);

      return {
        data: {
          putUrl: putUrl,
          path: path,
        },
      };
    } catch (e) {
      throw new ServiceNotAvailableError({
        errorCode: AwsS3ErrorEnum.serviceUnavailable,
        message: 'Service is not available.',
      });
    }
  }
}

export default AwsS3Controller;
