/* eslint-disable no-undef */

interface SizeInterface {
  width: number;
  height: number;
}

export const paths: Record<string, string> = {
  root: '',
  thumbnail: 'thumbnail',
  original: 'original',
};

export const sizes: Array<SizeInterface> = [
  {
    width: 256,
    height: 256,
  },
  {
    width: 64,
    height: 64,
  },
  {
    width: 32,
    height: 32,
  },
];

export function isSkippable(pathname: string): boolean {
  const movedPath = Object.keys(paths)
    .filter(key => 'root' != key)
    .find(key => pathname.includes(paths[key]) || pathname.includes(paths[key]));

  return !!movedPath;
}
