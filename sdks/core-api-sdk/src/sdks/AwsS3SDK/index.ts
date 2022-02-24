import { HttpRequestMethods } from '@ultras/services/NetworkService/types';
import CoreApiBaseSDK, { Mode } from '../CoreApiBaseSDK';
import { DynamicQueryParam } from '../types';
import {
  SigningUrlParamsInterface,
  UploadViaSignedUrlParamsInterface,
  UploadParamsInterface,
} from './types';

export class AwsS3SDK extends CoreApiBaseSDK {
  constructor(mode?: Mode) {
    super(mode, 's3');
  }

  public getSignedUrl(params: SigningUrlParamsInterface) {
    return this.api?.makeAPIGetRequest('signed-url', {
      query_params: params as DynamicQueryParam,
    });
  }

  public uploadViaSignedUrl(params: UploadViaSignedUrlParamsInterface) {
    return this.api?.request(params.signedUrl, {
      body: params.file,
      method: HttpRequestMethods.PUT,
    });
  }

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
