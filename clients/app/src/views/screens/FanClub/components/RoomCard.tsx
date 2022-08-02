import React from 'react';
import { StyleSheet, Image as RNImage } from 'react-native';
import { Pressable, Text, VStack, AspectRatio, Image } from 'native-base';
import moment from 'moment';
import I18n from 'i18n/i18n';
import BluredView from 'views/components/base/BluredView';
import { getReadableNumber } from 'utils/helpers/readableNumber';
import preventMultiCalls from 'utils/helpers/preventMultiCalls';
import { IRoomCardProps } from '../types';

const RoomCard: React.FC<IRoomCardProps> = ({ data, onPress }) => {
  const [ratio, setRatio] = React.useState(3 / 2);

  React.useLayoutEffect(() => {
    if (data.post.image) {
      RNImage.getSize(data.post.image, (w, h) => {
        setRatio(w / h);
      });
    }
  }, [data.post.image]);

  return (
    <Pressable onPress={preventMultiCalls(() => onPress())}>
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
              {getReadableNumber(data.post.commentsCount)} comments
            </Text>
            <Text variant={'cardInfo'}>
              {I18n.t('rooms-by')} {data.post.author.username}
              {data.post.fanClub && ', ' + data.post.fanClub.name}
            </Text>
          </VStack>
        </VStack>
      </BluredView>
    </Pressable>
  );
};

export default React.memo<IRoomCardProps>(RoomCard);

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    borderRadius: 13,
  },
});
