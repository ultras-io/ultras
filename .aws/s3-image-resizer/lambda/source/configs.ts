/* eslint-disable no-undef */

import { thumbnailSizes } from '@ultras/services/aws/S3Service';

interface ISize {
  width: number;
  height: number;
}

export const paths: Record<string, string> = {
  root: '',
  thumbnail: 'thumbnail',
  original: 'original',
};

export const sizes: Array<ISize> = Object.values(thumbnailSizes);

export function isSkippable(pathname: string): boolean {
  const movedPath = Object.keys(paths)
    .filter(key => 'root' != key)
    .find(key => pathname.includes(paths[key]) || pathname.includes(paths[key]));

  return !!movedPath;
}
