import React from 'react';
import {View} from 'react-native';
import I18n from 'i18n/i18n';

import UltrasText from 'views/components/base/UltrasText';
import Avatar, {SizeEnum as AvatarSize} from 'views/components/base/Avatar';
import Divider, {TypeEnum as DividerType} from 'views/components/base/Divider';
import Button, {
  AppearanceEnum as ButtonAppearance,
  BoxSizeEnum as ButtonBoxSize,
  IconPositionEnum as ButtonIconPosition,
} from 'views/components/base/Button';
import Icon from 'views/components/base/Icon';

import {IconNamesEnum as Icons} from 'assets/icons';

import {getReadableNumber} from 'utils/helpers/readableNumber';

import {ISupportersClubInfoProps} from './types';

import styles from './styles';

const SupportersClubInfo: React.FC<ISupportersClubInfoProps> = ({
  avatarUri,
  name,
  isOfficial = false,
  ultrasCount,
  city,
  team,
  myStatus,
}) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.avatar}>
          <Avatar avatarUri={avatarUri} size={AvatarSize.ExtraBig} />
        </View>
        <View style={styles.info}>
          <UltrasText color="tertiary" style={styles.name}>
            {name}{' '}
            {isOfficial && (
              <Icon name={Icons.Badge} size={17} color="success" />
            )}
          </UltrasText>
          <View style={styles.line}>
            <UltrasText color="secondaryText" style={styles.text}>
              {getReadableNumber(ultrasCount)} {I18n.t('ultras')}
            </UltrasText>
            <View style={styles.divider}>
              <Divider />
            </View>
            <UltrasText color="secondaryText" style={styles.text}>
              {city}
            </UltrasText>
          </View>
          <Button
            title={team.name}
            onPress={() => {}}
            boxSize={ButtonBoxSize.Contain}
            appearance={ButtonAppearance.Minimal}
            color="secondaryText"
            icon={Icons.Team}
            iconPosition={ButtonIconPosition.Left}
          />
          <View style={styles.joinButton}>
            <Button
              title={I18n.t('supportersClubJoin')}
              onPress={() => {}}
              color="textInvert"
              bgColor="bgColorInvert"
              icon={Icons.ArrowRightSquare}
              iconPosition={ButtonIconPosition.Left}
            />
          </View>
        </View>
      </View>
      <View style={styles.dividerH}>
        <Divider type={DividerType.Horizontal} />
      </View>
    </>
  );
};

export default React.memo<ISupportersClubInfoProps>(SupportersClubInfo);
