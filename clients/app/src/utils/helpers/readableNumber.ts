const truncate = (x: number): string => {
  const s = x.toString();
  const pos = s.indexOf('.') + 2;
  if (pos === 1) {
    return s;
  }
  return Number(s.slice(0, pos)).toString();
};

export const getReadableNumber = (x: number): string => {
  if (x < 1000) {
    return x.toString();
  } else if (x < 1000 * 1000) {
    return truncate(x / 1000) + 'K';
  } else if (x < 1000 * 1000 * 1000) {
    return truncate(x / 1000 / 1000) + 'M';
  } else if (x < 1000 * 1000 * 1000 * 1000) {
    return truncate(x / 1000 / 1000 / 1000) + 'B';
  } else if (x < 1000 * 1000 * 1000 * 1000 * 1000) {
    return truncate(x / 1000 / 1000 / 1000 / 1000) + 'T';
  }
  return '∞';
};
