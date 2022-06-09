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
    ],
  ],
  [],
  [
    [
      {
        text: I18n.t('joinUsEnterCode'),
      },
      {
        text: (phoneNumber: string) => phoneNumber,
        textProps: {
          fontWeight: 700,
          fontSize: '6xl',
        },
      },
      {
        jumpToStep: 3,
        text: I18n.t('changeNumber'),
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
