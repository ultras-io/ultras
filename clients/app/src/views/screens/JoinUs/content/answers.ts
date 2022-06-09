import I18n from 'i18n/i18n';
import { Answer } from '../types';

const answers: Answer[] = [
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
    type: 'phoneNumber',
    pre: {},
    post: {
      confirmed: [
        {
          text: (phoneNumber: string) => phoneNumber,
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
    pre: {},
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
    pre: {},
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
    type: 'success',
    pre: {
      text: I18n.t('gotIt'),
    },
    post: { confirmed: [], denied: [] },
  },
];

export default answers;
