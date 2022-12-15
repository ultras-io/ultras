import { IThumbnailSize, ThumbnailSizeEnum } from './types';

export const thumbnailSizes: Record<ThumbnailSizeEnum, IThumbnailSize> = {
  [ThumbnailSizeEnum.Size47x47]: { width: 47, height: 47 },
  [ThumbnailSizeEnum.Size64x64]: { width: 64, height: 64 },
  [ThumbnailSizeEnum.Size72x72]: { width: 72, height: 72 },
  [ThumbnailSizeEnum.Size110x110]: { width: 110, height: 110 },
  [ThumbnailSizeEnum.Size136x136]: { width: 136, height: 136 },
  [ThumbnailSizeEnum.Size345x196]: { width: 345, height: 196 },
  [ThumbnailSizeEnum.Size375x213]: { width: 375, height: 213 },
};
