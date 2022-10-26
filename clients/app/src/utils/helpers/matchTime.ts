import moment from 'moment';
import I18n from 'i18n/i18n';
import { MatchStatusesEnum } from '@ultras/utils';

export const formatDateAndTime = (
  dateTime?: string,
  matchStatus?: MatchStatusesEnum,
  elapsedTime?: number
) => {
  let date = '';
  let time = '';

  // @TODO - following statuses need to be handled
  // timeToBeDefined = "time-to-be-defined",
  // halfTime = "half-time",
  // postponed = "postponed",
  // canceled = "canceled",
  // suspended = "suspended",
  // interrupted = "interrupted"

  if (
    matchStatus === MatchStatusesEnum.preMatch ||
    matchStatus === MatchStatusesEnum.finished
  ) {
    if (moment(dateTime).year() === new Date().getFullYear())
      date = moment(dateTime).format('DD MMM').toUpperCase();
    else date = moment(dateTime).format('DD.MM.YY');
    time = moment(dateTime).format('HH:mm');
  } else if (matchStatus === MatchStatusesEnum.live) {
    date = I18n.t('matches-live');
    time = (elapsedTime || 0) + '’';
  } else if (matchStatus === MatchStatusesEnum.extraTime) {
    date = I18n.t('matches-et');
    time = (elapsedTime || 0) + '’';
  } else if (matchStatus === MatchStatusesEnum.penalties) {
    date = I18n.t('matches-finished');
    time = I18n.t('matches-penalties');
  }

  // @TODO: maybe we need to change text when date/time is not provided?
  date = date || '–– –––';
  time = time || '–:–';

  return { date, time };
};

export const isMatchGoing = (status: MatchStatusesEnum): boolean => {
  if (
    status === MatchStatusesEnum.live ||
    status === MatchStatusesEnum.halfTime ||
    status === MatchStatusesEnum.extraTime ||
    status === MatchStatusesEnum.penalties
  )
    return true;
  return false;
};
