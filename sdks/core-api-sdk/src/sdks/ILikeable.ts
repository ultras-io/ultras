import type { IResponse } from './CoreApiBaseSDK';
import type { ResourceIdentifier } from './types';

type Return<TBody, THeaders> = undefined | Promise<IResponse<TBody, THeaders>>;

interface ILikeable {
  getLikes<TBody, THeaders>(resourceId: ResourceIdentifier): Return<TBody, THeaders>;
  like<TBody, THeaders>(resourceId: ResourceIdentifier): Return<TBody, THeaders>;
  unlike<TBody, THeaders>(resourceId: ResourceIdentifier): Return<TBody, THeaders>;
}

export default ILikeable;
