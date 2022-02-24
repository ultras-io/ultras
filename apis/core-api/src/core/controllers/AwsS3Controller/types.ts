import { ControllerResultType } from 'types';

export type AwsS3SignedUrlParam = {
  folder: string;
  extension: string;
};

export type AwsS3SignedUrlResult = ControllerResultType<null | {
  putUrl: string;
  path: string;
}>;
