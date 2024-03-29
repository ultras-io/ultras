import type { IResponse } from './CoreApiBaseSDK';
import type { QueryParam, ResourceIdentifier } from './types';

type Return<TBody, THeaders> = undefined | Promise<IResponse<TBody, THeaders>>;

interface ICatchable {
  getCatches<TBody, THeaders>(
    resourceId: ResourceIdentifier,
    params: QueryParam
  ): Return<TBody, THeaders>;

  catch<TBody, THeaders>(resourceId: ResourceIdentifier): Return<TBody, THeaders>;
  uncatch<TBody, THeaders>(resourceId: ResourceIdentifier): Return<TBody, THeaders>;
}

export default ICatchable;
