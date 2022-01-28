import envConfigs from 'dotenv';
import path from 'path';

envConfigs.config({
  path: path.join(__dirname, '..', '..', '.env'),
});

const intConf = (value: string | number): number => {
  return 'string' == typeof value ? parseInt(value, 10) : value;
};

const dbConfig = {
  host: process.env.DB_HOST || '',
  database: process.env.DB_NAME || '',
  username: process.env.DB_USERNAME || '',
  password: process.env.DB_PASSWORD || '',
  port: intConf(process.env.DB_PORT || 5432),
  logging: Boolean(intConf(process.env.DB_LOGGING || 1)) || false,
};

const serverConfig = {
  host: process.env.HOST,
  port: parseInt(process.env.PORT || ''),
};

const authConfig = {
  accessTokenSecret: process.env.AUTH_ACCESS_TOKEN_SECRET || '',
  accessTokenLifetime: intConf(process.env.AUTH_ACCESS_TOKEN_LIFETIME || 300),
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

const mailerConfig = {
  apiKey: process.env.SENDGRID_API_KEY || '',
};

const smsConfig = {
  accountSid: process.env.TWILIO_ACCOUNT_SID || '',
  authToken: process.env.TWILIO_AUTH_TOKEN || '',
  phoneNumber: process.env.TWILIO_SENDER_PHONE_NUMBER || '',
  messageServiceId: process.env.TWILIO_MESSAGE_SERVICE_ID || '',
};

const whiteList = process.env.CORS_WHITE_LIST;

const rapidApiConfig = {
  footballApi: {
    host: process.env.RAPIDAPI_FOOTBALL_API_HEADER_HOST,
    key: process.env.RAPIDAPI_FOOTBALL_API_HEADER_KEY,
    baseUrl: process.env.RAPIDAPI_FOOTBALL_API_BASEURL,
  },
  geoDb: {
    host: process.env.RAPIDAPI_GEODB_HEADER_HOST,
    key: process.env.RAPIDAPI_GEODB_HEADER_KEY,
    baseUrl: process.env.RAPIDAPI_GEODB_BASEURL,
  },
};

export {
  dbConfig,
  awsConfig,
  authConfig,
  whiteList,
  serverConfig,
  mailerConfig,
  smsConfig,
  rapidApiConfig,
};
