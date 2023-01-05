import { folders } from '@ultras/services/aws/S3Service';
import { AwsS3FolderEnum } from '@ultras/utils';

const ENVS: Record<string, string> = {
  production: 'production',
  staging: 'staging',
  development: 'development',
  test: 'test',
};

const HTTP_STATUS_METHODS: Record<string, number> = {
  ok: 200,
  created: 201,
  accepted: 202,
  noContent: 204,
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  rateLimitExceeded: 429,
  unavailableForLegalReasons: 451,
  internalServerError: 500,
  serviceNotAvailable: 503,
};

const DEFAULT_PAGINATION_ATTRIBUTES = {
  LIMIT: 50,
  OFFSET: 0,
};

const AWS_S3_BUCKET_FOLDERS: Record<AwsS3FolderEnum, string> = folders;

const MIME_TYPES: Record<string, string> = {
  png: 'image/png',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
};

export {
  ENVS,
  HTTP_STATUS_METHODS,
  DEFAULT_PAGINATION_ATTRIBUTES,
  AWS_S3_BUCKET_FOLDERS,
  MIME_TYPES,
};
