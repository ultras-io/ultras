import I18n from 'i18n/i18n';
import { Answer } from '../types';

export const answers: Answer[] = [
  {
    type: 'button',
    pre: {
      text: I18n.t('okLetsStart'),
    },
    post: {
      confirmed: [
        {
          text: I18n.t('okLetsStart'),
        },
      ],
      denied: [],
    },
  },
  {
    type: 'button',
    pre: {
      text: I18n.t('joinUsLetMeEnter'),
    },
    post: {
      confirmed: [
        {
          text: I18n.t('joinUsLetMeEnter'),
        },
      ],
      denied: [],
    },
  },
  {
    type: 'emailOrPhone',
    pre: {},
    post: {
      confirmed: [
        {
          text: (emailOrPhoneValue: string) => emailOrPhoneValue,
        },
      ],
      denied: [],
    },
  },
  {
    type: '4digits',
    pre: {},
    post: {
      confirmed: [
        {
          text: (code: string) => code,
        },
      ],
      denied: [],
    },
  },
  {
    type: 'selectTeam',
    pre: {
      text: I18n.t('joinUsSelectTeam'),
    },
    post: {
      confirmed: [
        {
          text: (team: string) => team,
        },
        {
          pressable: true,
          text: I18n.t('tapToChange'),
          textProps: {
            variant: 'smallTitle',
            underline: true,
            textAlign: 'right',
          },
        },
      ],
      denied: [],
    },
  },

  {
    type: 'username',
    pre: {},
    post: {
      confirmed: [
        {
          text: (username: string) => username,
        },
      ],
      denied: [],
    },
  },
  {
    type: 'notification',
    pre: {
      text: I18n.t('allowNotifications'),
    },
    post: {
      confirmed: [
        {
          text: I18n.t('joinUsNotificationAllowed'),
        },
      ],
      denied: [
        {
          text: I18n.t('joinUsNotificationNotAllowed'),
          description: I18n.t('joinUsNotificationNotAllowedText'),
        },
      ],
    },
  },
  {
    type: 'location',
    pre: {
      text: I18n.t('enableLocationsServices'),
    },
    post: {
      confirmed: [
        {
          text: I18n.t('joinUsLocationEnabled'),
        },
      ],
      denied: [
        {
          text: I18n.t('joinUsLocationNotEnabled'),
          description: I18n.t('joinUsLocationNotEnabledText'),
        },
      ],
    },
  },
  {
    type: 'register',
    pre: {
      text: I18n.t('joinUsLetMeIn'),
    },
    post: { confirmed: [], denied: [] },
  },
];

export const answerLogin: Answer = {
  type: 'login',
  pre: {
    text: I18n.t('joinUsLetMeIn'),
  },
  post: { confirmed: [], denied: [] },
};
