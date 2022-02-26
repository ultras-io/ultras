import { v4 as uuidv4 } from 'uuid';
import awsSdk from 'aws-sdk';
import { buildFileName, AwsS3FolderEnum } from '@ultras/utils';
import { AWS_S3_BUCKET_FOLDERS, MIME_TYPES } from '@constants';
import { awsConfig } from 'config';
import BaseService from '../BaseService';

const s3 = new awsSdk.S3({
  apiVersion: '2010-09-09',
  accessKeyId: awsConfig.s3.accessKeyId,
  secretAccessKey: awsConfig.s3.secretAccessKey,
  region: awsConfig.s3.region,
  signatureVersion: 'v4',
});

class S3Service extends BaseService {
  static async getSignedUrl(folderName: AwsS3FolderEnum, extension: string) {
    // build unique file name with provided extension
    const folder = AWS_S3_BUCKET_FOLDERS[folderName];
    const key = `${folder}/${buildFileName(uuidv4())}.${extension}`;

    // generate putObject url in AWS.
    const putUrl = await s3.getSignedUrlPromise('putObject', {
      Bucket: awsConfig.s3.Bucket,
      ACL: awsConfig.s3.ACL,
      ContentType: MIME_TYPES[extension],
      Expires: awsConfig.signedUrlExpires,
      Key: key,
    });

    return {
      putUrl,
      path: key,
    };
  }
}

export default S3Service;
