import React from 'react';
import I18n from 'i18n/i18n';

import UltrasText from 'views/components/base/UltrasText';
import {DirectionENum as AnimationDirection} from 'views/components/base/WithAnimation';
import Button, {
  SizeEnum as ButtonSize,
  AppearanceEnum as ButtonAppearance,
} from 'views/components/base/Button';
import {ScenarStep, ActionTypeEnum, MessageTypeEnum} from './types';
import styles from './styles';

const scenario: Array<ScenarStep> = [
  {
    id: 0,
    messages: [
      {
        messageId: 1,
        type: MessageTypeEnum.Default,
        message: (
          <>
            <UltrasText style={styles.textBold}>{I18n.t('hi')}</UltrasText>
            <UltrasText>{I18n.t('joinUsGreeting')}</UltrasText>
            <UltrasText style={styles.textBold}>
              {I18n.t('letsStart')}
            </UltrasText>
          </>
        ),
      },
    ],
    action: {
      type: ActionTypeEnum.Button,
      title: I18n.t('okLetsStart'),
      direction: AnimationDirection.Right2Left,
    },
  },
  {
    id: 1,
    messages: [
      {
        messageId: 1,
        type: MessageTypeEnum.Default,
        message: <UltrasText>{I18n.t('joinUsPickTeam')}</UltrasText>,
      },
    ],
    action: {
      type: ActionTypeEnum.Team,
      title: I18n.t('joinUsSelectTeam'),
      direction: AnimationDirection.Right2Left,
    },
  },
  {
    id: 2,
    messages: [
      {
        messageId: 1,
        type: MessageTypeEnum.Default,
        message: <UltrasText>{I18n.t('joinUsEnterPhone')}</UltrasText>,
        //direction: AnimationDirection.Left2Right,
      },
    ],
    action: {
      type: ActionTypeEnum.Button,
      title: I18n.t('joinUsLetMeEnter'),
      direction: AnimationDirection.Right2Left,
    },
  },
  {
    id: 3,
    messages: [
      {
        messageId: 1,
        type: MessageTypeEnum.Default,
        message: <UltrasText>{I18n.t('joinUsGetConfirmationCode')}</UltrasText>,
        //direction: AnimationDirection.Left2Right,
      },
    ],
    action: {
      type: ActionTypeEnum.Phone,
      title: I18n.t('confirmNumber'),
      direction: AnimationDirection.Right2Left,
    },
  },
  {
    id: 4,
    messages: [
      {
        messageId: 1,
        type: MessageTypeEnum.Phone,
        message: <UltrasText>{I18n.t('joinUsEnterCode')}</UltrasText>,
        messageRenderer: (number, changeNumber, canChange) => (
          <>
            <UltrasText>{I18n.t('joinUsEnterCode')}</UltrasText>
            <UltrasText style={styles.textBold}>{number}</UltrasText>
            {canChange && (
              <Button
                appearance={ButtonAppearance.UnderLined}
                size={ButtonSize.Small}
                color="quaternary"
                isDisabled={!canChange}
                title={I18n.t('changeNumber')}
                onPress={changeNumber}
              />
            )}
          </>
        ),
        //direction: AnimationDirection.Left2Right,
      },
    ],
    action: {
      type: ActionTypeEnum.PhoneConfirm,
      direction: AnimationDirection.Right2Left,
    },
  },
  {
    id: 5,
    messages: [
      {
        messageId: 1,
        type: MessageTypeEnum.Default,
        message: <UltrasText>{I18n.t('almostDone')}</UltrasText>,
        //direction: AnimationDirection.Left2Right,
      },
      {
        messageId: 2,
        type: MessageTypeEnum.Default,
        message: <UltrasText>{I18n.t('joinUsPickUsername')}</UltrasText>,
        //direction: AnimationDirection.Left2Right,
      },
    ],
    action: {
      type: ActionTypeEnum.UserName,
      title: I18n.t('confirm'),
      direction: AnimationDirection.Right2Left,
    },
  },
  {
    id: 6,
    messages: [
      {
        messageId: 1,
        type: MessageTypeEnum.Default,
        message: (
          <>
            <UltrasText style={styles.textBold}>
              {I18n.t('joinUsWellDoneLast')}
            </UltrasText>
            <UltrasText>{I18n.t('joinUsWantNotify')}</UltrasText>
          </>
        ),
        //direction: AnimationDirection.Left2Right,
      },
      {
        messageId: 2,
        type: MessageTypeEnum.Default,
        message: (
          <UltrasText>{I18n.t('joinUsNotificationsLocation')}</UltrasText>
        ),
        //direction: AnimationDirection.Left2Right,
      },
    ],
    action: {
      type: ActionTypeEnum.AllowNotifications,
      title: I18n.t('allowNotifications'),
      direction: AnimationDirection.Right2Left,
    },
  },
  {
    id: 7,
    messages: [
      {
        messageId: 1,
        type: MessageTypeEnum.Default,
        message: <UltrasText>{I18n.t('joinUsAndLocation')}</UltrasText>,
        //direction: AnimationDirection.Left2Right,
      },
    ],
    action: {
      type: ActionTypeEnum.AllowLocation,
      title: I18n.t('enableLocationsServices'),
      direction: AnimationDirection.Right2Left,
    },
  },
  {
    id: 8,
    messages: [
      {
        messageId: 1,
        type: MessageTypeEnum.Default,
        message: (
          <>
            <UltrasText style={styles.textBold}>
              {I18n.t('joinUsCongrats')}
            </UltrasText>
            <UltrasText>{I18n.t('joinUsCongratsText')}</UltrasText>
          </>
        ),
        //direction: AnimationDirection.Left2Right,
      },
    ],
    action: {
      type: ActionTypeEnum.StartApp,
      title: I18n.t('gotIt'),
      direction: AnimationDirection.Right2Left,
    },
  },
];

export default scenario.sort((a, b) => b.id - a.id);
