import { thumbnailSizes } from './constants';
import { ThumbnailSizeEnum } from './types';

class S3Service {
  constructor(
    private readonly bucketRegion: string,
    private readonly bucketName: string
  ) {}

  private getHostname(): string {
    return `https://${this.bucketName}.s3.${this.bucketRegion}.amazonaws.com`;
  }

  private getImageUrl(folderName: string, objectKey: string) {
    return this.getHostname() + `/${folderName}/${objectKey}`;
  }

  getOriginalUrl(objectKey: string) {
    return this.getImageUrl('original', objectKey);
  }

  getThumbnailUrl(objectKey: string, thumbnailSize: ThumbnailSizeEnum) {
    const { width, height } = thumbnailSizes[thumbnailSize];
    const folder = `thumbnail/${width}x${height}`;

    return this.getImageUrl(folder, objectKey);
  }
}

export default S3Service;
