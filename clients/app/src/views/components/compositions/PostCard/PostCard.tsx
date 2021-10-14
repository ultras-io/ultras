import React from 'react';
import {View} from 'react-native';
import I18n from 'i18n/i18n';

import BluredView from 'views/components/base/BluredView';
import UltrasText from 'views/components/base/UltrasText';
import Icon from 'views/components/base/Icon';

import Button, {
  SizeEnum as ButtonSize,
  BoxSizeEnum as ButtonBoxSize,
  IconPositionEnum as ButtonIconPosition,
} from 'views/components/base/Button';
import CommentsCount from 'views/components/base/CommentsCount';
import {IconNamesEnum} from 'assets/icons';

import {IPostCardProps} from './types';
import styles from './styles';

const PostCard: React.FC<IPostCardProps> = ({
  date,
  title,
  supportersClub,
  commentsCount,
  isFollowing,
}) => {
  return (
    <BluredView style={styles.container}>
      <UltrasText style={styles.date} color="text">
        {date.toLocaleTimeString([], {
          month: 'short',
          day: 'numeric',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
        })}
      </UltrasText>
      <UltrasText style={styles.title} color="text">
        {title}
      </UltrasText>
      <UltrasText style={styles.supportersClub} color="text">
        {I18n.t('postDiscussionAt')}
        <UltrasText style={[styles.supportersClub, styles.bold]} color="text">
          {supportersClub}
        </UltrasText>
      </UltrasText>

      <View style={styles.bottomButtons}>
        <View style={styles.comments}>
          <CommentsCount count={commentsCount} />
        </View>
        {!isFollowing && (
          <Button
            title={I18n.t('postFollowTopic')}
            onPress={() => {}}
            boxSize={ButtonBoxSize.Contain}
            size={ButtonSize.Small}
            color="text"
            bgColor="primary"
            icon={IconNamesEnum.Hearth}
            iconPosition={ButtonIconPosition.Right}
          />
        )}
        <View style={styles.arrow}>
          <Icon key="icon" name={IconNamesEnum.ArrowRight} size={12} />
        </View>
      </View>
    </BluredView>
  );
};

export default React.memo<IPostCardProps>(PostCard);
