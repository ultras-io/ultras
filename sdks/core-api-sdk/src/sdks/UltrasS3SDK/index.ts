import { HttpRequestMethods } from '@ultras/services/NetworkService/types';
import CoreApiBaseSDK, { Mode } from '../CoreApiBaseSDK';
import { DynamicQueryParam } from '../types';
import {
  SigningUrlParamsInterface,
  UploadViaSignedUrlParamsInterface,
  UploadParamsInterface,
} from './types';

export class UltrasS3SDK extends CoreApiBaseSDK {
  constructor(mode?: Mode) {
    super(mode, 's3');
  }

  /**
   * Will generate a file path and signed url to upload into AWS S3.
   */
  public getSignedUrl(params: SigningUrlParamsInterface) {
    return this.api?.makeAPIGetRequest('signed-url', {
      query_params: params as DynamicQueryParam,
    });
  }

  /**
   * File must be uploaded to AWS S3 using pre-signed url.
   * Just provide a file instance and pre-signed url.
   */
  public uploadViaSignedUrl(params: UploadViaSignedUrlParamsInterface) {
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
  public async upload(params: UploadParamsInterface) {
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
}
