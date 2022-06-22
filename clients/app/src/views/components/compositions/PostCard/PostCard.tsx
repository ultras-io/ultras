import React from 'react';
import { View, Pressable } from 'react-native';
import moment from 'moment';
import I18n from 'i18n/i18n';

import BluredView from 'views/components/base/BluredView';
import UltrasText from 'views/components/base/UltrasText';
import Icon from 'views/components/base/Icon';
import CommentsCount from 'views/components/base/CommentsCount';
import Like from 'views/components/base/Like';
import { IconNamesEnum } from 'assets/icons';
import preventMultiCalls from 'utils/helpers/preventMultiCalls';

import { IPostCardProps } from './types';
import styles from './styles';

const PostCard: React.FC<IPostCardProps> = ({
  imageUri, // eslint-disable-line @typescript-eslint/no-unused-vars
  date,
  title,
  creator,
  supportersClub,
  commentsCount,
  isLiked,
  likeCount,
  onPress,
}) => {
  return (
    <Pressable onPress={preventMultiCalls(() => onPress())}>
      <BluredView style={styles.container}>
        <UltrasText style={styles.date} color="textPrimary">
          {moment(date).fromNow()}
        </UltrasText>
        <UltrasText style={styles.title} color="textPrimary">
          {title}
        </UltrasText>
        <View style={styles.creatorContainer}>
          <UltrasText style={styles.creator} color="textPrimary">
            {I18n.t('events-by')} {creator}
            {supportersClub && ', '}
          </UltrasText>
          {supportersClub && (
            <UltrasText style={styles.creator} color="textSecondary">
              {supportersClub}
            </UltrasText>
          )}
        </View>
        <View style={styles.bottomButtons}>
          <View style={styles.likeAndComment}>
            <CommentsCount count={commentsCount} />
          </View>
          <View style={styles.arrow}>
            <Icon key="icon" name={IconNamesEnum.ArrowRight} size={'ic-2xs'} />
          </View>
        </View>
      </BluredView>
    </Pressable>
  );
};

export default React.memo<IPostCardProps>(PostCard);
