/* eslint-disable no-undef */

interface ISize {
  width: number;
  height: number;
}

export const paths: Record<string, string> = {
  root: '',
  thumbnail: 'thumbnail',
  original: 'original',
};

export const sizes: Record<string, Partial<Record<string, ISize>>> = {
  profilePicture: {
    '47x47': { width: 47, height: 47 },
    '64x64': { width: 64, height: 64 },
    '136x136': { width: 136, height: 136 },
  },
  fanClubAvatar: {
    '72x72': { width: 72, height: 72 },
    '110x110': { width: 110, height: 110 },
  },
  fanClubCover: {
    // ...
  },
  event: {
    '345x196': { width: 345, height: 196 },
    '375x213': { width: 375, height: 213 },
  },
  room: {
    // ...
  },
};

export function isSkippable(pathname: string): boolean {
  const movedPath = Object.keys(paths)
    .filter(key => 'root' != key)
    .find(key => pathname.includes(paths[key]) || pathname.includes(paths[key]));

  return !!movedPath;
}
