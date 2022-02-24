import zeroFill from './zerofill';

const buildFileName = (fileName: string) => {
  const instance = new Date();

  const year = zeroFill(instance.getFullYear(), 4);
  const month = zeroFill(instance.getMonth() + 1);
  const day = zeroFill(instance.getDate());
  const date = `${year}${month}${day}`;

  const hours = zeroFill(instance.getHours());
  const minutes = zeroFill(instance.getMinutes());
  const seconds = zeroFill(instance.getSeconds());
  const milliseconds = zeroFill(instance.getMilliseconds(), 3);
  const time = `${hours}${minutes}${seconds}${milliseconds}`;

  return `${date}${time}-${fileName}`;
};

export default buildFileName;
