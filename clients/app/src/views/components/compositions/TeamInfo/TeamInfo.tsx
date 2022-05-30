import React from 'react';
import { View } from 'react-native';
import I18n from 'i18n/i18n';
import { useTheme } from 'themes';
import { Divider } from 'native-base';
import UltrasText from 'views/components/base/UltrasText';
import Avatar, { SizeEnum as AvatarSize } from 'views/components/base/Avatar';
import Button, {
  IconPositionEnum as ButtonIconPosition,
} from 'views/components/base/Button';
import { IconNamesEnum as Icons } from 'assets/icons';
import { TeamTypesEnum } from '@ultras/utils';
import { ITeamInfoProps } from './types';
import styles from './styles';

const TeamInfo: React.FC<ITeamInfoProps> = ({ data, isFavorite = false }) => {
  const { colors } = useTheme();

  return (
    <>
      <View style={styles.container}>
        <View style={styles.avatar}>
          <Avatar avatarUri={data.logo} size={AvatarSize.ExtraBig} isTeam />
        </View>
        <View style={styles.info}>
          <UltrasText color="textSectionHeader" style={styles.name}>
            {data.name}
          </UltrasText>
          <UltrasText color="textSecondary">
            {data.type === TeamTypesEnum.club
              ? data.city.name + ', ' + data.country.name
              : I18n.t('nationalTeam')}
          </UltrasText>
          <View style={styles.joinButton}>
            <Button
              title={isFavorite ? I18n.t('teamInFavorites') : I18n.t('teamAdd')}
              onPress={() => {}}
              color={isFavorite ? 'textPrimary' : 'textPrimaryInvert'}
              bgColor={isFavorite ? 'buttonAction' : 'buttonActionInvert'}
              icon={Icons.Hearth}
              iconPosition={ButtonIconPosition.Left}
            />
          </View>
        </View>
      </View>

      <Divider bg={colors.backgroundDividerTransparent} thickness={1} />
    </>
  );
};

export default React.memo<ITeamInfoProps>(TeamInfo);
