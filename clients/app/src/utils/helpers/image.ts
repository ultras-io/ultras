import { AwsS3FolderEnum, AwsS3ThumbnailEnum } from '@ultras/utils';
import { buildUltrasS3SDK } from 'stores/sdkBuilder';

const s3Sdk = buildUltrasS3SDK();

function getImage(
  folder: AwsS3FolderEnum,
  size: AwsS3ThumbnailEnum,
  imageKey: Nullable<string>,
  defaultImage: Nullable<string> = null
): Nullable<string> {
  if (!imageKey) {
    return defaultImage;
  }

  const avatarUrl = s3Sdk.getThumbnailUrl(imageKey, folder, size);
  return avatarUrl || defaultImage;
}

export function getFanClubAvatar(
  size: AwsS3ThumbnailEnum,
  imageKey: Nullable<string>
): string {
  const defaultImage = ''; // @TODO: set default fan club avatar url
  return getImage(AwsS3FolderEnum.fanClubAvatar, size, imageKey, defaultImage)!;
}

export function getFanClubCover(
  size: AwsS3ThumbnailEnum,
  imageKey: Nullable<string>
): Nullable<string> {
  return getImage(AwsS3FolderEnum.fanClubCover, size, imageKey);
}

export function getProfilePicture(
  size: AwsS3ThumbnailEnum,
  imageKey: Nullable<string>
): Nullable<string> {
  const defaultImage = ''; // @TODO: set default profile picture url
  return getImage(AwsS3FolderEnum.profilePicture, size, imageKey, defaultImage);
}

export function getEventPhoto(
  size: AwsS3ThumbnailEnum,
  imageKey: Nullable<string>
): Nullable<string> {
  return getImage(AwsS3FolderEnum.event, size, imageKey);
}

export function getRoomPhoto(
  size: AwsS3ThumbnailEnum,
  imageKey: Nullable<string>
): Nullable<string> {
  return getImage(AwsS3FolderEnum.room, size, imageKey);
}
