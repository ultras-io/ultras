import { v4 as uuidv4 } from 'uuid';
import awsSdk from 'aws-sdk';
import { buildFileName } from '@ultras/utils';
import { awsConfig } from 'config';
import BaseService from './BaseService';

const bucketFolders: Record<string, string> = {
  profilePicture: 'profile-pictures',
  fanClubAvatar: 'fun-clubs/avatars',
  fanClubCover: 'fun-clubs/covers',
  topic: 'topics',
};

const mimeTypes: Record<string, string> = {
  png: 'image/png',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
};

const s3 = new awsSdk.S3({
  apiVersion: '2010-09-09',
  accessKeyId: awsConfig.s3.accessKeyId,
  secretAccessKey: awsConfig.s3.secretAccessKey,
  region: awsConfig.s3.region,
  signatureVersion: 'v4',
});

class AwsS3Service extends BaseService {
  static async getSignedUrl(folderName: string, extension: string) {
    // build unique file name with provided extension
    const folder = bucketFolders[folderName] || '';
    const key = `${folder}/${buildFileName(uuidv4())}.${extension}`;

    // generate putObject url in AWS.
    const putUrl = await s3.getSignedUrlPromise('putObject', {
      Bucket: awsConfig.s3.Bucket,
      ACL: awsConfig.s3.ACL,
      ContentType: mimeTypes[extension],
      Expires: awsConfig.signedUrlExpires,
      Key: key,
    });

    return {
      putUrl,
      path: key,
    };
  }
}

export default AwsS3Service;
