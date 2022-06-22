import React from 'react';
import { Center, Avatar, Text, VStack, HStack, Pressable } from 'native-base';
import VerticalDivider from 'views/components/base/VerticalDivider';
import I18n from 'i18n/i18n';
import BluredView from 'views/components/base/BluredView';
import { getReadableNumber } from 'utils/helpers/readableNumber';
import preventMultiCalls from 'utils/helpers/preventMultiCalls';
import { IFanClubCardProps } from './types';
import styles from './styles';

// @TODO will be removed when backend will provide working URIs
const avatarURI =
  'https://sun9-west.userapi.com/sun9-45/s/v1/ig2/9PudeHuKhNxah9LmPaWaitRu21WykeBA57r78KFmgXmtPDSYuVIxFxrLSGRH1uH6gLJviz702FjNa1YmmrYwMh9q.jpg?size=1080x1080&quality=95&type=album';

const FanClubCard: React.FC<IFanClubCardProps> = ({
  data,
  direction = 'vertical',
  onPress,
}) => {
  return (
    <Pressable onPress={preventMultiCalls(() => onPress())}>
      {direction === 'vertical' ? (
        <BluredView style={styles.container}>
          <Avatar source={{ uri: avatarURI }} mr={15} />
          <VStack flex="1" justifyContent={'center'}>
            <Text variant={'searchTitle'} lineHeight={'sm'} numberOfLines={3}>
              {data.name}
            </Text>
            <HStack>
              <Text variant={'info'}>
                {getReadableNumber(data.membersCount)} {I18n.t('ultras')}
              </Text>
              <VerticalDivider />
              <Text variant={'info'}>{data.city.name}</Text>
            </HStack>
          </VStack>
        </BluredView>
      ) : (
        <Center px={'2'} w={100}>
          <Avatar source={{ uri: avatarURI }} size={'av-lg'} mb={2} />
          <Text variant={'smallTitle'} textAlign={'center'} numberOfLines={1}>
            {data.shortName}
          </Text>
          {data.membersCount && (
            <Text variant={'smallDescription'} textAlign={'center'}>
              {getReadableNumber(data.membersCount)} {I18n.t('ultras')}
            </Text>
          )}
        </Center>
      )}
    </Pressable>
  );
};

export default React.memo<IFanClubCardProps>(FanClubCard);
