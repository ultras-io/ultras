import envConfigs from 'dotenv';

envConfigs.config({ path: `${__dirname}/../.env` });

const DEFAULT_DATABASE_PORT = '5432';

const dbConfig = {
  host: process.env.DB_HOST || '',
  database: process.env.DB_NAME || '',
  username: process.env.DB_USERNAME || '',
  password: process.env.DB_PASSWORD || '',
  dialect: process.env.DB_DIALECT || 'postgres',
  port: parseInt(process.env.DB_PORT || DEFAULT_DATABASE_PORT),
  logging: Boolean(parseInt(process.env.DB_LOGGING || '1', 10)) || false,
};

const serverConfig = {
  host: process.env.HOST,
  port: parseInt(process.env.PORT || ''),
};

const authConfig = {
  apiAuthSecretKey: process.env.API_KEY || 'API_KEY',
  authTokenSecret: process.env.AUTHORIZATION_TOKEN_SECRET || 'LOCAL_SECRET_KEY',
  resetPasswordTokenSecret:
    process.env.RESET_PASSWORD_TOKEN_SECRET || 'EMAIL_SECRET_KEY',
};

const awsConfig = {
  s3: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'us-east-1',
    ACL: 'public-read',
    Bucket: '<bucket name>',
    BucketFolder: 'bucket folder',
    contentType: 'binary/octet-stream',
  },
  allowedExtensions: ['jpeg', 'jpg', 'svg', 'png', 'pdf', 'docx'],
  rootFolders: {
    jpeg: 'images',
    jpg: 'images',
    svg: 'images',
    png: 'images',
    pdf: 'documents',
    docx: 'documents',
  },
};

/*const mailerConfig = {
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY || null,
};*/

const whiteList = process.env.CORS_WHITE_LIST;

export { serverConfig, authConfig, awsConfig, whiteList, dbConfig };
