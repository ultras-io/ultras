import I18n from 'i18n/i18n';
import { Message } from '../types';

const messages: Message[][][] = [
  [
    [
      {
        text: I18n.t('hi'),
        textProps: {
          fontWeight: 700,
        },
      },
      {
        text: I18n.t('joinUsGreeting'),
      },
      {
        text: I18n.t('letsStart'),
        textProps: {
          fontWeight: 700,
        },
      },
    ],
  ],

  [
    [
      {
        text: I18n.t('joinUsPickTeam'),
      },
    ],
  ],
  [
    [
      {
        text: I18n.t('joinUsEnterPhone'),
      },
      {
        pressable: true,
        change: true,
        jumpToStep: 3,
        availableBefore: 5,
        text: (emailOrPhoneKey: string) =>
          I18n.t('joinUsEnterEmailPhone', { x: I18n.t(emailOrPhoneKey) }),
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
        text: I18n.t('joinUsEnterCode'),
      },
      {
        text: (emailOrPhone: string) => emailOrPhone,
        textProps: {
          fontWeight: 700,
          fontSize: '6xl',
        },
      },
      {
        pressable: true,
        jumpToStep: 3,
        availableBefore: 5,
        text: (emailOrPhoneValue: string) =>
          I18n.t('changeEmailPhone', { x: I18n.t(emailOrPhoneValue) }),
        textProps: {
          variant: 'link',
        },
      },
    ],
  ],
  [
    [
      {
        text: I18n.t('almostDone'),
      },
    ],
    [
      {
        text: I18n.t('joinUsPickUsername'),
      },
    ],
  ],
  [
    [
      {
        text: I18n.t('joinUsWellDoneLast'),
      },
      {
        text: I18n.t('joinUsWantNotify'),
      },
    ],
    [
      {
        text: I18n.t('joinUsNotificationsLocation'),
      },
    ],
  ],
  [
    [
      {
        text: I18n.t('joinUsAndLocation'),
      },
    ],
  ],
  [
    [
      {
        text: I18n.t('joinUsCongrats'),
      },
    ],
    [
      {
        text: I18n.t('joinUsCongratsText'),
      },
    ],
  ],
];

export default messages;
