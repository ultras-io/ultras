import {
  UltrasS3SDK,
  UltrasS3ThumbnailSizeEnum,
  UltrasS3FolderEnum,
} from '@ultras/core-api-sdk';
import { thumbnailSizes } from '@ultras/services/aws/S3Service';

const sdk = new UltrasS3SDK(process.env.REACT_APP_NODE_ENV as Mode);
const filename = '20221215233814543-f1b78c72-490a-4958-94d5-2504877ee60e.jpg';

export const runTest = () => {
  for (const folderName in thumbnailSizes) {
    console.log(`>>> Images of "${folderName}"`);

    const folder = folderName as UltrasS3FolderEnum;
    console.log('  -> uploaded original image: ', sdk.getOriginalUrl(filename, folder));

    const sizeList = thumbnailSizes[folder];
    if (!sizeList) {
      continue;
    }

    const sizes = Object.keys(sizeList) as Array<UltrasS3ThumbnailSizeEnum>;
    for (const size of sizes) {
      console.log(
        `  -> thumbnail image [${size}]: `,
        sdk.getThumbnailUrl(filename, folder, size),
      );
    }
  }
};
