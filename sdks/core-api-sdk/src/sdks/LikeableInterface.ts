import type { ResponseInterface } from './CoreApiBaseSDK';
import type { ResourceIdentifier } from './types';

type Return<TBody, THeaders> = undefined | Promise<ResponseInterface<TBody, THeaders>>;

interface LikeableInterface {
  getLikes<TBody, THeaders>(resourceId: ResourceIdentifier): Return<TBody, THeaders>;
  like<TBody, THeaders>(resourceId: ResourceIdentifier): Return<TBody, THeaders>;
  unlike<TBody, THeaders>(resourceId: ResourceIdentifier): Return<TBody, THeaders>;
}

export default LikeableInterface;
