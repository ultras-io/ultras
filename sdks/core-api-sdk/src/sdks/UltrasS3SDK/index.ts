import { HttpRequestMethods } from '@ultras/services/NetworkService/types';
import CoreApiBaseSDK, { Mode } from '../CoreApiBaseSDK';
import type {
  ISigningUrlParams,
  IUploadViaSignedUrlParams,
  IUploadParams,
} from './types';
export * from './types';

export class UltrasS3SDK extends CoreApiBaseSDK {
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
      headers: {
        'X-File-Content-Type': 'image/jpeg', // params.mimeType,
      },
      method: HttpRequestMethods.PUT,
      jsonBody: false,
    });
  }

  /**
   * Will generate a file path and signed url to upload into AWS S3,
   * after that it will be upload file to AWS S3 using pre-signed url
   * and give you back saved file path.
   */
  public async upload(params: IUploadParams) {
    const extension = params.fileName.split('.').pop() || '';
    const responseSigning = await this.getSignedUrl({
      folder: params.folder,
      extension,
    });

    if (!responseSigning) {
      return null;
    }

    const result = await this.uploadViaSignedUrl({
      file: params.file,
      signedUrl: responseSigning.body.data.putUrl,
      mimeType: responseSigning.body.data.mimeType,
    });

    if (!result || !result.ok) {
      return null;
    }

    return {
      path: responseSigning.body.data.path,
    };
  }
}
