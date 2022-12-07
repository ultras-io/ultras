import { Body } from 'aws-sdk/clients/s3';

interface IParams {
  body?: Body;
  format: 'png' | 'jpeg';
  width: number;
  height: number;
}

async function resize(params: IParams): Promise<Body | null> {
  if (!params.body) {
    return null;
  }

  const sharp = require('sharp');
  const imageBuffer = await sharp(params.body as Buffer)
    .resize(params.width, params.height)
    .withMetadata()
    .toFormat(params.format)
    .toBuffer();

  return imageBuffer as Body;
}

export default resize;
