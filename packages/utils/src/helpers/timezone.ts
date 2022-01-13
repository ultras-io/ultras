import zerofill from './zerofill';

type TzOperationCallback = (timestamp: number, tzOffset: number) => number;

const calculate = (
  date: Date | string,
  isZuluFormat: boolean,
  tzOperation: TzOperationCallback
): string => {
  const _date: Date = 'string' == typeof date ? new Date(date) : date;

  const timestamp = _date.getTime();
  const tzOffset = new Date().getTimezoneOffset() * 60 * 1000;

  const newTimestamp = tzOperation(timestamp, tzOffset);
  const instance = new Date(newTimestamp);

  const strDate = [
    instance.getFullYear(),
    zerofill(instance.getMonth() + 1, 2),
    zerofill(instance.getDate(), 2),
  ].join('-');

  const strTime = [
    zerofill(instance.getHours(), 2),
    zerofill(instance.getMinutes(), 2),
    zerofill(instance.getSeconds(), 2),
  ].join(':');

  const strMillis = zerofill(instance.getMilliseconds(), 3);

  return isZuluFormat
    ? `${strDate}T${strTime}.${strMillis}Z`
    : `${strDate} ${strTime}.${strMillis}`;
};

const localToZulu = (date: Date | string): string => {
  return calculate(date, true, (timestamp: number, tzOffset: number) => {
    return timestamp - tzOffset;
  });
};

const localToUtcString = (date: Date | string): string => {
  return calculate(date, false, (timestamp: number, tzOffset: number) => {
    return timestamp - tzOffset;
  });
};

const localToUtc = (date: Date | string) => {
  return new Date(localToUtcString(date));
};

const utcToZulu = (date: Date | string): string => {
  return calculate(date, true, (timestamp: number, tzOffset: number) => {
    return timestamp + tzOffset;
  });
};

const utcToLocalString = (date: Date | string): string => {
  return calculate(date, false, (timestamp: number, tzOffset: number) => {
    return timestamp + tzOffset;
  });
};

const utcToLocal = (date: Date | string) => {
  return new Date(utcToLocalString(date));
};

const timezone = {
  localToZulu,
  localToUtcString,
  localToUtc,
  utcToZulu,
  utcToLocalString,
  utcToLocal,
};

export default timezone;
