import { AwsS3FolderEnum, AwsS3ThumbnailEnum } from '@ultras/utils';
import { IThumbnailSize } from './types';

// ------------------------------------------------------------
// image sizes from design
//   47x74 - user list component
//   64x64 - user avatar - in profile screen
// 136x136 - user avatar - in edit profile screen
//   72x72 - fan club avatar - in home screen
// 110x110 - fan club avatar - in single fan club screen
// 345x196 - event - for event card in any screen
// 375x213 - event - in single event screen

export const thumbnailSizes: Record<
  AwsS3FolderEnum,
  Partial<Record<AwsS3ThumbnailEnum, IThumbnailSize>>
> = {
  [AwsS3FolderEnum.profilePicture]: {
    [AwsS3ThumbnailEnum.size47x47]: { width: 47, height: 47 },
    [AwsS3ThumbnailEnum.size64x64]: { width: 64, height: 64 },
    [AwsS3ThumbnailEnum.size136x136]: { width: 136, height: 136 },
  },
  [AwsS3FolderEnum.fanClubAvatar]: {
    [AwsS3ThumbnailEnum.size72x72]: { width: 72, height: 72 },
    [AwsS3ThumbnailEnum.size110x110]: { width: 110, height: 110 },
  },
  [AwsS3FolderEnum.fanClubCover]: {
    // ...
  },
  [AwsS3FolderEnum.event]: {
    [AwsS3ThumbnailEnum.size345x196]: { width: 345, height: 196 },
    [AwsS3ThumbnailEnum.size375x213]: { width: 375, height: 213 },
  },
  [AwsS3FolderEnum.room]: {
    // ...
  },
};

export const folders: Record<AwsS3FolderEnum, string> = {
  [AwsS3FolderEnum.profilePicture]: 'profile-pictures',
  [AwsS3FolderEnum.fanClubAvatar]: 'fan-club-avatars',
  [AwsS3FolderEnum.fanClubCover]: 'fan-club-covers',
  [AwsS3FolderEnum.room]: 'rooms',
  [AwsS3FolderEnum.event]: 'events',
};
