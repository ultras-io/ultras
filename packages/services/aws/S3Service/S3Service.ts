import { AwsS3FolderEnum, AwsS3ThumbnailEnum } from '@ultras/utils';
import { thumbnailSizes, folders } from './constants';

class S3Service {
  constructor(
    private readonly bucketRegion: string,
    private readonly bucketName: string
  ) {}

  private getHostname(): string {
    return `https://${this.bucketName}.s3.${this.bucketRegion}.amazonaws.com`;
  }

  private getImageUrl(
    thumbnailFolderName: string,
    imageFolder: AwsS3FolderEnum,
    objectKey: string
  ) {
    const endpoint = `/${thumbnailFolderName}/${folders[imageFolder]}/${objectKey}`;
    return this.getHostname() + endpoint;
  }

  getOriginalUrl(objectKey: string, imageFolder: AwsS3FolderEnum) {
    return this.getImageUrl('original', imageFolder, objectKey);
  }

  getThumbnailUrl(
    objectKey: string,
    imageFolder: AwsS3FolderEnum,
    thumbnailSize: AwsS3ThumbnailEnum
  ) {
    const size = thumbnailSizes[imageFolder][thumbnailSize];
    if (!size) {
      return null;
    }

    const folder = `thumbnail/${size.width}x${size.height}`;
    return this.getImageUrl(folder, imageFolder, objectKey);
  }
}

export default S3Service;
