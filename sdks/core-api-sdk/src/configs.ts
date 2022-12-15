/**
 * DON'T use process.env.* outside of this file,
 * other files are not processed after build.
 *
 * After build scripts/postbuild.js command will be executed and
 * all configs wil be replaced from .env file.
 */

export default {
  coreApi: {
    dev: process.env.CORE_API_DEV,
    staging: process.env.CORE_API_STAGING,
    prod: process.env.CORE_API_PROD,
  },

  aws: {
    s3: {
      region: process.env.AWS_S3_BUCKET_REGION,
      bucket: process.env.AWS_S3_BUCKET_NAME,
    },
  },
};
