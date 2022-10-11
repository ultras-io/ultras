import type { IResponse } from './CoreApiBaseSDK';
import type { ResourceIdentifier } from './types';

type Return<TBody, THeaders> = undefined | Promise<IResponse<TBody, THeaders>>;

interface ICommentable {
  getComments<TBody, THeaders>(resourceId: ResourceIdentifier): Return<TBody, THeaders>;

  addComment<TBody, THeaders>(
    resourceId: ResourceIdentifier,
    content: string
  ): Return<TBody, THeaders>;

  updateComment<TBody, THeaders>(
    resourceId: ResourceIdentifier,
    commentId: ResourceIdentifier,
    content: string
  ): Return<TBody, THeaders>;

  deleteComment<TBody, THeaders>(
    resourceId: ResourceIdentifier,
    commentId: ResourceIdentifier
  ): Return<TBody, THeaders>;
}

export default ICommentable;
