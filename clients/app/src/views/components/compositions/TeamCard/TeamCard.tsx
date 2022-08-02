import React from 'react';
import { View, Pressable } from 'react-native';
import { Image, Circle, Text, HStack } from 'native-base';
import VerticalDivider from 'views/components/base/VerticalDivider';
import I18n from 'i18n/i18n';
import { useTheme } from 'themes';
import { getReadableNumber } from 'utils/helpers/readableNumber';
import preventMultiCalls from 'utils/helpers/preventMultiCalls';
import BluredView from 'views/components/base/BluredView';
import { TeamTypesEnum } from '@ultras/utils';
import { ITeamCardProps } from './types';
import styles from './styles';

const TeamCard: React.FC<ITeamCardProps> = ({ data, onPress }) => {
  const fanClubsCount = 0;
  const { colors } = useTheme();

  return (
    <Pressable onPress={preventMultiCalls(onPress)}>
      <BluredView style={styles.container}>
        <Circle size={'av-md'} bg={colors.backgroundLogo} mr={15}>
          <Image
            source={{ uri: data.logo }}
            size={'av-xs'}
            resizeMode={'contain'}
            alt={data.name}
          />
        </Circle>

        <View style={styles.info}>
          <Text variant={'searchTitle'} lineHeight={'sm'} numberOfLines={3}>
            {data.name}
          </Text>

          <HStack>
            <Text variant={'info'}>
              {fanClubsCount === 0 && I18n.t('fanClubs-no')}
              {fanClubsCount === 1 &&
                getReadableNumber(fanClubsCount) + ' ' + I18n.t('fanClub')}
              {fanClubsCount > 1 &&
                getReadableNumber(fanClubsCount) + ' ' + I18n.t('fanClubs')}
            </Text>

            {data.type === TeamTypesEnum.club && (
              <>
                <VerticalDivider key={'divider1'} />
                <Text variant={'info'} key={'country'}>
                  {data.country.name}
                </Text>
                <VerticalDivider key={'divider2'} />
                <Text
                  variant={'info'}
                  key={'city'}
                  ellipsizeMode={'middle'}
                  flex={1}
                  numberOfLines={1}
                >
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
