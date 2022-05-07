/* eslint-disable @typescript-eslint/no-explicit-any */

const cyrb53 = (object: any, seed = 0): string => {
  if (!object) {
    return '';
  }

  const objectString = JSON.stringify(object);

  let h1 = 0xdeadbeef ^ seed;
  let h2 = 0x41c6ce57 ^ seed;

  for (let i = 0; i < objectString.length; i++) {
    const ch = objectString.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }

  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);

  return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString();
};

const buildObjectHash = (object: any): string => {
  if (!object) {
    return '';
  }

  const objectString = JSON.stringify(object);

  return cyrb53(objectString, 1) + '_' + cyrb53(objectString, 2);
};

export default buildObjectHash;
