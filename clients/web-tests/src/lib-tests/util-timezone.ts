import { timezone } from '@ultras/utils';

export const runTest = () => {
  const dateTime = '2021-01-01 08:00:00.000';

  console.log('timezone:', {
    dateTime,
    
    zuluL2U: timezone.localToZulu(dateTime),
    zuluU2L: timezone.utcToZulu(dateTime),

    strL2U: timezone.localToUtcString(dateTime),
    datL2U: timezone.localToUtc(dateTime),
    strU2L: timezone.utcToLocalString(dateTime),
    datU2L: timezone.utcToLocal(dateTime),

    strReverse1: timezone.utcToLocalString(timezone.localToUtcString(dateTime)),
    strReverse2: timezone.localToUtcString(timezone.utcToLocalString(dateTime)),
    datReverse1: timezone.utcToLocal(timezone.localToUtc(dateTime)),
    datReverse2: timezone.localToUtc(timezone.utcToLocal(dateTime)),

    strDatReverse1: timezone.utcToLocalString(timezone.localToUtc(dateTime)),
    strDatReverse2: timezone.localToUtcString(timezone.utcToLocal(dateTime)),
    datStrReverse1: timezone.utcToLocal(timezone.localToUtcString(dateTime)),
    datStrReverse2: timezone.localToUtc(timezone.utcToLocalString(dateTime)),
  });
};
