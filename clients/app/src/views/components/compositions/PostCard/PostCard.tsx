import React from 'react';
import {View, Pressable} from 'react-native';
import moment from 'moment';
import I18n from 'i18n/i18n';

import BluredView from 'views/components/base/BluredView';
import UltrasText from 'views/components/base/UltrasText';
import Icon from 'views/components/base/Icon';

import CommentsCount from 'views/components/base/CommentsCount';
import Like from 'views/components/base/Like';

import {IconNamesEnum} from 'assets/icons';

import {IPostCardProps} from './types';
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
    <Pressable onPress={onPress}>
      <BluredView style={styles.container}>
        <UltrasText style={styles.date} color="text">
          {moment(date).fromNow()}
        </UltrasText>
        <UltrasText style={styles.title} color="text">
          {title}
        </UltrasText>
        <View style={styles.creatorContainer}>
          <UltrasText style={styles.creator} color="text">
            {I18n.t('eventsBy')} {creator}
            {supportersClub && ', '}
          </UltrasText>
          {supportersClub && (
            <UltrasText style={styles.creator} color="secondary">
              {supportersClub}
            </UltrasText>
          )}
        </View>
        <View style={styles.bottomButtons}>
          <View style={styles.likeAndComment}>
            <View style={styles.like}>
              <Like isLiked={isLiked} count={likeCount} onPress={() => {}} />
            </View>
            <CommentsCount count={commentsCount} />
          </View>
          <View style={styles.arrow}>
            <Icon key="icon" name={IconNamesEnum.ArrowRight} size={12} />
          </View>
        </View>
      </BluredView>
    </Pressable>
  );
};

export default React.memo<IPostCardProps>(PostCard);
