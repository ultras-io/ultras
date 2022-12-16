/* eslint-disable @typescript-eslint/no-non-null-assertion */

import S3Service from '@ultras/services/aws/S3Service';
import { AwsS3FolderEnum, AwsS3ThumbnailEnum } from '@ultras/utils';
import { HttpRequestMethods } from '@ultras/services/NetworkService/types';
import CoreApiBaseSDK, { Mode } from '../CoreApiBaseSDK';
import type {
  ISigningUrlParams,
  IUploadViaSignedUrlParams,
  IUploadParams,
} from './types';
import configs from '../../configs';
export * from './types';

export {
  AwsS3ThumbnailEnum as UltrasS3ThumbnailSizeEnum,
  AwsS3FolderEnum as UltrasS3FolderEnum,
};

export class UltrasS3SDK extends CoreApiBaseSDK {
  private readonly serviceS3 = new S3Service(
    configs.aws.s3.region!,
    configs.aws.s3.bucket!
  );

  constructor(mode?: Mode) {
    super(mode, 'aws/s3');
  }

  /**
   * Will generate a file path and signed url to upload into AWS S3.
   */
  public getSignedUrl(params: ISigningUrlParams) {
    return this.api?.makeAPIGetRequest('signed-url', {
      query_params: this.buildQueryParam(params),
    });
  }

  /**
   * File must be uploaded to AWS S3 using pre-signed url.
   * Just provide a file instance and pre-signed url.
   */
  public uploadViaSignedUrl(params: IUploadViaSignedUrlParams) {
    return this.api?.request(params.signedUrl, {
      body: params.file,
      method: HttpRequestMethods.PUT,
    });
  }

  /**
   * Will generate a file path and signed url to upload into AWS S3,
   * after that it will be upload file to AWS S3 using pre-signed url
   * and give you back saved file path.
   */
  public async upload(params: IUploadParams) {
    const extension = params.file.name.split('.').pop() || '';
    const responseSigning = await this.getSignedUrl({
      folder: params.folder,
      extension,
    });

    if (!responseSigning) {
      return null;
    }

    await this.uploadViaSignedUrl({
      file: params.file,
      signedUrl: responseSigning.body.data.putUrl,
    });

    return {
      path: responseSigning.body.data.path,
    };
  }

  /**
   * Generate original image url by object key.
   */
  getOriginalUrl(objectKey: string, imageFolder: AwsS3FolderEnum) {
    return this.serviceS3.getOriginalUrl(objectKey, imageFolder);
  }

  /**
   * Generate thumbnail image url by object key and thumbnail size.
   */
  getThumbnailUrl(
    objectKey: string,
    imageFolder: AwsS3FolderEnum,
    thumbnailSize: AwsS3ThumbnailEnum
  ) {
    return this.serviceS3.getThumbnailUrl(objectKey, imageFolder, thumbnailSize);
  }
}
