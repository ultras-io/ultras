import React from 'react';
import { View } from 'react-native';
import { Button } from 'native-base';
import I18n from 'i18n/i18n';
import { useTheme } from 'themes';
import { Divider, Circle, Image, Text } from 'native-base';
import { TeamTypesEnum } from '@ultras/utils';
import { ITeamInfoProps } from './types';
import styles from './styles';

const TeamInfo: React.FC<ITeamInfoProps> = ({ data }) => {
  const { colors } = useTheme();

  const isFavorite = false;

  return (
    <>
      <View style={styles.container}>
        <Circle size={'av-xl'} bg={colors.backgroundLogo} mr={'5'}>
          <Image
            source={{ uri: data.logo }}
            size={'av-lg'}
            resizeMode={'contain'}
            alt={data.name}
          />
        </Circle>

        <View style={styles.info}>
          <Text variant={'sectionTitle'} numberOfLines={2}>
            {data.name}
          </Text>

          <Text variant={'info'}>
            {data.type === TeamTypesEnum.club
              ? data.city.name + ', ' + data.country.name
              : I18n.t('nationalTeam')}
          </Text>

          <Button variant={isFavorite ? 'actionInvert' : 'action'} mt={'3'} mr={'4'}>
            {I18n.t(isFavorite ? 'teamInFavorites' : 'teamAdd')}
          </Button>
        </View>
      </View>

      <Divider bg={colors.backgroundDividerTransparent} thickness={1} />
    </>
  );
};

export default React.memo<ITeamInfoProps>(TeamInfo);
