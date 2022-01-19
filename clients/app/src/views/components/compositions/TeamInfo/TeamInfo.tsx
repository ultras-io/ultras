import React from 'react';
import { View } from 'react-native';
import I18n from 'i18n/i18n';

import UltrasText from 'views/components/base/UltrasText';
import Avatar, { SizeEnum as AvatarSize } from 'views/components/base/Avatar';
import Divider, { TypeEnum as DividerType } from 'views/components/base/Divider';
import Button, {
  IconPositionEnum as ButtonIconPosition,
} from 'views/components/base/Button';
import { IconNamesEnum as Icons } from 'assets/icons';

import { ITeamInfoProps } from './types';
import styles from './styles';

const TeamInfo: React.FC<ITeamInfoProps> = ({
  avatarUri,
  name,
  country,
  city,
  inMyTeams, //eslint-disable-line @typescript-eslint/no-unused-vars
}) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.avatar}>
          <Avatar avatarUri={avatarUri} size={AvatarSize.ExtraBig} isTeam />
        </View>
        <View style={styles.info}>
          <UltrasText color="tertiary" style={styles.name}>
            {name}
          </UltrasText>
          <UltrasText color="tertiaryText">
            {city ? city + ', ' + country : I18n.t('nationalTeam')}
          </UltrasText>
          <View style={styles.joinButton}>
            <Button
              title={I18n.t('teamAdd')}
              onPress={() => {}}
              color="textInvert"
              bgColor="bgColorInvert"
              icon={Icons.Team}
              iconPosition={ButtonIconPosition.Left}
            />
          </View>
        </View>
      </View>

      <Divider type={DividerType.Horizontal} bgColor={'quaternaryText'} />
    </>
  );
};

export default React.memo<ITeamInfoProps>(TeamInfo);
