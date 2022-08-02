import React from 'react';
import { StyleSheet, Image as RNImage } from 'react-native';
import { Pressable, Text, VStack, HStack, AspectRatio, Image } from 'native-base';
import moment from 'moment';
import I18n from 'i18n/i18n';
import Icon from 'views/components/base/Icon';
import { Icons } from 'assets/icons';
import BluredView from 'views/components/base/BluredView';
import { getReadableNumber } from 'utils/helpers/readableNumber';
import preventMultiCalls from 'utils/helpers/preventMultiCalls';
import { IEventCardProps } from './types';

const EventCard: React.FC<IEventCardProps> = ({ data, onPress }) => {
  const [ratio, setRatio] = React.useState(3 / 2);

  React.useLayoutEffect(() => {
    if (data.post.image) {
      RNImage.getSize(data.post.image, (w, h) => {
        setRatio(w / h);
      });
    }
  }, [data.post.image]);

  return (
    <Pressable onPress={preventMultiCalls(onPress)}>
      <BluredView style={styles.container}>
        <VStack>
          {data.post.image && (
            <AspectRatio ratio={{ base: ratio }} width={{ base: 'full' }}>
              <Image
                source={{ uri: data.post.image }}
                alt={data.post.title}
                resizeMode="cover"
              />
            </AspectRatio>
          )}

          <VStack p={4}>
            <Text variant={'cardTime'}>
              {new Date(data.dateTime) < new Date()
                ? moment(data.dateTime).fromNow()
                : moment(data.dateTime).format('MMM DD, hh:mm')}
            </Text>
            <Text variant={'cardTitle'} mb={'1'}>
              {data.post.title}
            </Text>
            <Text variant={'cardStats'}>
              {getReadableNumber(2763)} {I18n.t('common-going')}
            </Text>
            <Text variant={'cardPlace'} mt={'1'}>
              <Icon name={Icons.Map} size={'ic-2xs'} color="textPrimary" />{' '}
              {data.location.name}
            </Text>
            <HStack>
              <Text variant={'cardInfo'}>
                {I18n.t('events-eventBy')} {data.post.author.username}
                {data.post.fanClub && ', ' + data.post.fanClub.name}
              </Text>
            </HStack>
          </VStack>
        </VStack>
      </BluredView>
    </Pressable>
  );
};

export default React.memo<IEventCardProps>(EventCard);

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    borderRadius: 13,
  },
});
