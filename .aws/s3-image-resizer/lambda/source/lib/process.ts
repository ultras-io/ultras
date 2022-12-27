import AWS from 'aws-sdk';
import resize from './resize';

import * as configs from '../configs';

const S3 = new AWS.S3({
  signatureVersion: 'v4',
});

async function processItem(bucketName: string, objectKey: string) {
  const format = objectKey.endsWith('.png') ? 'png' : 'jpeg';
  const fileName = objectKey.replace(new RegExp(`^${configs.paths.root}/`), '');

  const fileNameParts = fileName.split('/');
  fileNameParts.pop();
  const folder = fileNameParts.join('/');

  // check folder and size are valid
  if (!folder) {
    console.log('>>> SKIPPING: folder name not found.', {
      'Object Key': objectKey,
    });
    return;
  }
  if (!configs.sizes[folder]) {
    console.log('>>> SKIPPING: sizes for the folder not defined.', {
      'Object Key': objectKey,
      'Folder Name': folder,
    });
    return;
  }
  const thumbnailSizeList = Object.values(configs.sizes[folder]);
  if (thumbnailSizeList.length === 0) {
    console.log('>>> SKIPPING: sizes list are empty for the folder.', {
      'Object Key': objectKey,
      'Folder Name': folder,
    });
    return;
  }
  // end: check folder and size are valid

  // load uploaded file data from AWS S3
  const objectGetParams = {
    Key: objectKey,
    Bucket: bucketName,
  };

  const s3ObjectResponse = await S3.getObject(objectGetParams).promise();
  if (!s3ObjectResponse.Body) {
    return;
  }
  // end: load uploaded file data

  for (const size of thumbnailSizeList) {
    if (!size) {
      continue;
    }

    // resize image by {WIDTH} and {HEIGHT}
    const imageBuffer = await resize({
      body: s3ObjectResponse.Body,
      format: format,
      height: size.height,
      width: size.width,
    });

    if (!imageBuffer) {
      continue;
    }
    // end: resize image

    // upload resized file into /public/thumbnail/{WIDTH}x{HEIGHT}
    const filePathThumbnail = `${configs.paths.thumbnail}/${size.width}x${size.height}/${fileName}`;
    await S3.putObject({
      Body: imageBuffer,
      Bucket: bucketName,
      ACL: 'public-read',
      ContentType: 'image/' + format,
      Key: filePathThumbnail,
    }).promise();
    // end: upload resized file
  }

  // move uploaded file into /public/original
  const filePathOriginal = `${configs.paths.original}/${fileName}`;

  await S3.putObject({
    Body: s3ObjectResponse.Body,
    Bucket: bucketName,
    ACL: 'public-read',
    ContentType: 'image/' + format,
    Key: filePathOriginal,
  }).promise();

  await S3.deleteObject({
    Bucket: bucketName,
    Key: objectKey,
  }).promise();
  // end: move uploaded file
}

export default processItem;
