import moment from 'moment';
import I18n from 'i18n/i18n';

import { MatchStateEnum } from 'views/components/compositions/MatchTime';

export const formatDateAndTime = (
  startTime?: Date,
  matchState?: MatchStateEnum,
  minute?: number
) => {
  let date = '';
  let time = '';

  if (
    matchState === MatchStateEnum.NotStarted ||
    matchState === MatchStateEnum.Finished
  ) {
    date = moment(startTime).format('DD.MM.YY');
    time = moment(startTime).format('hh:mm');
  } else if (matchState === MatchStateEnum.Live) {
    date = I18n.t('matchesLive');
    time = (minute || 0) + '’';
  } else if (matchState === MatchStateEnum.ExtraTime) {
    date = I18n.t('matchesET');
    time = (minute || 0) + '’';
  } else if (matchState === MatchStateEnum.Penalties) {
    date = I18n.t('matchesFinished');
    time = I18n.t('matchesPenalties');
  }

  return {
    date,
    time,
  };
};
