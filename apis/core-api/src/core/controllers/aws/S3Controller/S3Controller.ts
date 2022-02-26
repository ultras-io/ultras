import { AwsS3ErrorEnum } from '@ultras/utils';
import { awsConfig } from 'config';
import { AWS_S3_BUCKET_FOLDERS } from '@constants';
import BaseController from 'core/controllers/BaseController';
import S3Service from 'core/services/aws/S3Service';
import {
  InvalidUserInput,
  RequiredParameterNotProvided,
  ServiceNotAvailableError,
} from 'modules/exceptions';

import { S3SignedUrlParam, S3SignedUrlResult } from './types';

class S3Controller extends BaseController {
  static async getSignedUrl({ folder, extension }: S3SignedUrlParam): S3SignedUrlResult {
    if (!folder) {
      throw new RequiredParameterNotProvided({
        errorCode: AwsS3ErrorEnum.folderMissing,
        message: 'Parameter folder is required.',
      });
    }

    const availableFolders = Object.keys(AWS_S3_BUCKET_FOLDERS);
    if (!availableFolders.includes(folder)) {
      throw new InvalidUserInput({
        errorCode: AwsS3ErrorEnum.folderUnknown,
        message: 'Parameter folder is unknown.',
        availableFolders: availableFolders,
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
      const { putUrl, path } = await S3Service.getSignedUrl(folder, extension);

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

export default S3Controller;
