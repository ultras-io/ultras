import React from 'react';
import { View } from 'react-native';
import I18n from 'i18n/i18n';
import { useTheme } from 'themes';
import { Divider, Circle, Image, Text } from 'native-base';
import { TeamTypesEnum } from '@ultras/utils';
import { ITeamInfoProps } from './types';
import styles from './styles';

const TeamInfo: React.FC<ITeamInfoProps> = ({ data, isFavorite = false }) => {
  const { colors } = useTheme();

  return (
    <>
      <View style={styles.container}>
        <Circle size={'av-xl'} bg={colors.backgroundLogo} mr={'5'}>
          <Image source={{ uri: data.logo }} size={'av-lg'} resizeMode={'contain'} />
        </Circle>

        <View style={styles.info}>
          <Text
            variant={'sectionHeader'}
            fontSize={'4xl'}
            fontFamily={'Montserrat'}
            fontWeight={'600'}
            letterSpacing={'-0.24px'}
            numberOfLines={2}
          >
            {data.name}
          </Text>

          <Text variant={'quinary'} fontSize={'lg'}>
            {data.type === TeamTypesEnum.club
              ? data.city.name + ', ' + data.country.name
              : I18n.t('nationalTeam')}
          </Text>

          {/* <View style={styles.joinButton}>
            <Button
              title={isFavorite ? I18n.t('teamInFavorites') : I18n.t('teamAdd')}
              onPress={() => {}}
              color={isFavorite ? 'textPrimary' : 'textPrimaryInvert'}
              bgColor={isFavorite ? 'buttonAction' : 'buttonActionInvert'}
              icon={Icons.Hearth}
              iconPosition={ButtonIconPosition.Left}
            />
          </View> */}
        </View>
      </View>

      <Divider bg={colors.backgroundDividerTransparent} thickness={1} />
    </>
  );
};

export default React.memo<ITeamInfoProps>(TeamInfo);
