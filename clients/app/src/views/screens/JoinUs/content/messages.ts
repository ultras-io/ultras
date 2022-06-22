import I18n from 'i18n/i18n';
import { Message } from '../types';

export const messages: Message[][][] = [
  [
    [
      {
        text: I18n.t('joinUs-hi'),
        textProps: {
          fontWeight: 700,
        },
      },
      {
        text: I18n.t('joinUs-greeting'),
      },
      {
        text: I18n.t('joinUs-letsStart'),
        textProps: {
          fontWeight: 700,
        },
      },
    ],
  ],
  [
    [
      {
        email: true,
        text: (emailOrPhoneKey: string) =>
          I18n.t('joinUs-enterX', { x: I18n.t(emailOrPhoneKey) }),
      },
      {
        email: true,
        pressable: true,
        change: true,
        jumpToStep: 2,
        availableBefore: 4,
        text: (emailOrPhoneKey: string) =>
          I18n.t('joinUs-signUpWithX', { x: I18n.t(emailOrPhoneKey) }),
        textProps: {
          variant: 'link',
        },
      },
    ],
  ],
  [],
  [
    [
      {
        text: I18n.t('joinUs-enterCode'),
      },
      {
        text: (emailOrPhone: string) => emailOrPhone,
        textProps: {
          fontWeight: 700,
          fontSize: '6xl',
        },
      },
      {
        email: true,
        pressable: true,
        jumpToStep: 3,
        availableBefore: 4,
        text: (emailOrPhoneValue: string) =>
          I18n.t('joinUs-changeX', { x: I18n.t(emailOrPhoneValue) }),
        textProps: {
          variant: 'link',
        },
      },
    ],
  ],

  [
    [
      {
        text: I18n.t('joinUs-almostDone'),
      },
    ],
    [
      {
        text: I18n.t('joinUs-pickTeam'),
      },
    ],
  ],

  [
    [
      {
        text: I18n.t('joinUs-pickUsername'),
      },
    ],
  ],
  [
    [
      {
        text: I18n.t('joinUs-wellDone'),
      },
      {
        text: I18n.t('joinUs-wantNotify'),
      },
    ],
    [
      {
        text: I18n.t('joinUs-notificationsAndLocation'),
      },
    ],
  ],
  [
    [
      {
        text: I18n.t('joinUs-andLocation'),
      },
    ],
  ],
  [
    [
      {
        text: I18n.t('joinUs-congrats'),
      },
    ],
    [
      {
        text: I18n.t('joinUs-congratsText'),
      },
    ],
  ],
];

export const messageLogin: Message[][] = [
  [
    {
      text: I18n.t('joinUs-login'),
    },
  ],
];
