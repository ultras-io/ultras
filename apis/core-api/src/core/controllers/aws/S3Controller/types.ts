import { AwsS3FolderEnum } from '@ultras/utils';
import { ControllerResultType } from 'types';

export type S3SignedUrlParam = {
  folder: AwsS3FolderEnum;
  extension: string;
};

export type S3SignedUrlResult = ControllerResultType<null | {
  putUrl: string;
  path: string;
  mimeType: string;
}>;
