import I18n from 'i18n/i18n';
import { Answer } from '../types';

export const answers: Answer[] = [
  {
    type: 'button',
    pre: {
      text: I18n.t('joinUs-letsStartOK'),
    },
    post: {
      confirmed: [
        {
          text: I18n.t('joinUs-letsStartOK'),
        },
      ],
      denied: [],
    },
  },
  {
    type: 'button',
    pre: {
      text: I18n.t('joinUs-letMeEnter'),
    },
    post: {
      confirmed: [
        {
          text: I18n.t('joinUs-letMeEnter'),
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
      text: I18n.t('joinUs-selectTeam'),
    },
    post: {
      confirmed: [
        {
          text: (team: string) => team,
        },
        {
          pressable: true,
          text: I18n.t('common-tapToChange'),
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
      text: I18n.t('joinUs-allowNotifications'),
    },
    post: {
      confirmed: [
        {
          text: I18n.t('joinUs-notificationAllowed'),
        },
      ],
      denied: [
        {
          text: I18n.t('joinUs-notificationNotAllowed'),
          description: I18n.t('joinUs-notificationNotAllowedText'),
        },
      ],
    },
  },
  {
    type: 'location',
    pre: {
      text: I18n.t('joinUs-enableLocationsServices'),
    },
    post: {
      confirmed: [
        {
          text: I18n.t('joinUs-locationEnabled'),
        },
      ],
      denied: [
        {
          text: I18n.t('joinUs-locationNotEnabled'),
          description: I18n.t('joinUs-locationNotEnabledText'),
        },
      ],
    },
  },
  {
    type: 'register',
    pre: {
      text: I18n.t('joinUs-letMeIn'),
    },
    post: { confirmed: [], denied: [] },
  },
];

export const answerLogin: Answer = {
  type: 'login',
  pre: {
    text: I18n.t('joinUs-letMeIn'),
  },
  post: { confirmed: [], denied: [] },
};
