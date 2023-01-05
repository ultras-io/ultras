import { AwsS3ThumbnailEnum } from '@ultras/utils';
import React from 'react';
import { Center, Avatar, Text, VStack, HStack, Pressable } from 'native-base';
import VerticalDivider from 'views/components/base/VerticalDivider';
import I18n from 'i18n/i18n';
import BluredView from 'views/components/base/BluredView';
import { getReadableNumber } from 'utils/helpers/readableNumber';
import preventMultiCalls from 'utils/helpers/preventMultiCalls';
import { IFanClubCardProps } from './types';
import styles from './styles';
import { getFanClubAvatar } from 'utils/helpers/image';

const FanClubCard: React.FC<IFanClubCardProps> = ({
  data,
  direction = 'vertical',
  type,
  onPress,
}) => {
  const avatarURI = React.useMemo(() => {
    return getFanClubAvatar(AwsS3ThumbnailEnum.size72x72, data.avatar);
  }, [data.avatar]);

  return (
    <Pressable onPress={preventMultiCalls(onPress)}>
      {direction === 'vertical' ? (
        <BluredView style={styles.container}>
          <Avatar source={{ uri: avatarURI }} mr={15} />
          <VStack flex="1" justifyContent={'center'}>
            <Text variant={'searchTitle'} lineHeight={'sm'} numberOfLines={3}>
              {data.name}
            </Text>
            <HStack>
              <Text variant={'info'}>
                {getReadableNumber(data.membersCount)} {I18n.t('common-ultras')}
              </Text>
              <VerticalDivider />
              <Text variant={'info'}>{data.city.name}</Text>
            </HStack>
          </VStack>
        </BluredView>
      ) : (
        <Center px={'2'} w={type === 'discover' ? 100 : 87}>
          <Avatar source={{ uri: avatarURI }} size={'av-lg'} mb={2} />
          <Text variant={'smallTitle'} textAlign={'center'} numberOfLines={1}>
            {data.shortName}
          </Text>
          {type === 'discover' && (
            <Text variant={'smallDescription'} textAlign={'center'}>
              {getReadableNumber(data.membersCount)} {I18n.t('common-ultras')}
            </Text>
          )}
        </Center>
      )}
    </Pressable>
  );
};

export default React.memo<IFanClubCardProps>(FanClubCard);
