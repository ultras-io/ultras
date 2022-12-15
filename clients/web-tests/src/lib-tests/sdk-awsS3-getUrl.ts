import { UltrasS3SDK, UltrasS3ThumbnailSizeEnum } from '@ultras/core-api-sdk';

const sdk = new UltrasS3SDK(process.env.REACT_APP_NODE_ENV as Mode);
const filename = '20221215233814543-f1b78c72-490a-4958-94d5-2504877ee60e.jpg';

export const runTest = () => {
  const sizes = Object.values(UltrasS3ThumbnailSizeEnum);

  console.log('>>> uploaded original image: ', sdk.getOriginalUrl(filename));
  for (const sizeString of sizes) {
    const size = sizeString as UltrasS3ThumbnailSizeEnum;
    console.log(`>>> thumbnail image [${size}]: `, sdk.getThumbnailUrl(filename, size));
  }
};
