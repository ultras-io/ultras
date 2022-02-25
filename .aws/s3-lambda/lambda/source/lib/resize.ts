import { Body } from 'aws-sdk/clients/s3';
import sharp from 'sharp';

interface ParamsInterface {
  body?: Body;
  format: 'png' | 'jpeg';
  width: number;
  height: number;
}

async function resize(params: ParamsInterface): Promise<Body | null> {
  if (!params.body) {
    return null;
  }

  const imageBuffer = await sharp(params.body as Buffer)
    .resize(params.width, params.height)
    .withMetadata()
    .toFormat(params.format)
    .toBuffer();

  return imageBuffer as Body;
}

export default resize;
