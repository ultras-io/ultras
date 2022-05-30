import React from 'react';
import { View, Pressable } from 'react-native';
import { Image, Circle, Text, HStack } from 'native-base';
import VerticalDivider from 'views/components/base/VerticalDivider';
import I18n from 'i18n/i18n';
import { useTheme } from 'themes';
import { getReadableNumber } from 'utils/helpers/readableNumber';
import BluredView from 'views/components/base/BluredView';
import UltrasText from 'views/components/base/UltrasText';
import { TeamTypesEnum } from '@ultras/utils';
import { ITeamCardProps } from './types';
import styles from './styles';

const TeamCard: React.FC<ITeamCardProps> = ({ data, onPress }) => {
  const fanClubsCount = Math.floor(Math.random() * 3);
  const { colors } = useTheme();

  return (
    <Pressable onPress={onPress}>
      <BluredView style={styles.container}>
        <Circle size={'av-md'} bg={colors.backgroundLogo} mr={15}>
          <Image source={{ uri: data.logo }} size={'av-xs'} />
        </Circle>

        <View style={styles.info}>
          <Text
            variant={'sectionHeader'}
            fontFamily={'Montserrat'}
            fontWeight={'700'}
            fontSize={'2xl'}
            lineHeight={'sm'}
            numberOfLines={3}
          >
            {data.name}
          </Text>

          <HStack>
            <Text variant={'quinary'} fontSize={'lg'}>
              {fanClubsCount === 0 && I18n.t('noFanClubs')}
              {fanClubsCount === 1 &&
                getReadableNumber(fanClubsCount) + ' ' + I18n.t('fanClub')}
              {fanClubsCount > 1 &&
                getReadableNumber(fanClubsCount) + ' ' + I18n.t('fanClubs')}
            </Text>

            {data.type === TeamTypesEnum.club && (
              <>
                <VerticalDivider />
                <Text variant={'quinary'} fontSize={'lg'}>
                  {data.country.name}
                </Text>
                <VerticalDivider />
                <Text variant={'quinary'} fontSize={'lg'}>
                  {data.city.name}
                </Text>
              </>
            )}
          </HStack>
        </View>
      </BluredView>
    </Pressable>
  );
};

export default React.memo<ITeamCardProps>(TeamCard);
