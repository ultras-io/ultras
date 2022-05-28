import React from 'react';
import { View, Image, Pressable } from 'react-native';
import moment from 'moment';
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
import Like from 'views/components/base/Like';
import { IconNamesEnum } from 'assets/icons';
import { getReadableNumber } from 'utils/helpers/readableNumber';

import { IEventCardProps } from './types';
import styles from './styles';

const EventCard: React.FC<IEventCardProps> = ({
  imageUri,
  date,
  title,
  location,
  goingCount,
  commentsCount,
  likeCount,
  creator,
  supportersClub,
  isGoing,
  isLiked,
  onPress,
}) => {
  return (
    <Pressable onPress={onPress}>
      <BluredView style={styles.container}>
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
        <View style={styles.innerContainer}>
          <UltrasText style={styles.date} color="textSecondary">
            {date < new Date()
              ? moment(date).fromNow()
              : moment(date).format('MMM DD, hh:mm')}
          </UltrasText>
          <UltrasText style={styles.title} color="textPrimary">
            {title}
          </UltrasText>
          <UltrasText style={styles.smallText} color="textSecondary">
            {getReadableNumber(goingCount)} {I18n.t('going')}
          </UltrasText>
          {location && (
            <UltrasText style={styles.location} color="textSecondary">
              {location}
            </UltrasText>
          )}
          <UltrasText style={styles.smallText} color="textPrimary">
            {I18n.t('eventsEventBy')} {creator}
            {supportersClub && ', ' + supportersClub}
          </UltrasText>
          <View style={styles.bottomButtons}>
            <View style={styles.comments}>
              <Like isLiked={isLiked} count={likeCount} onPress={() => {}} />
            </View>
            <View style={styles.comments}>
              <CommentsCount count={commentsCount} />
            </View>
            <Button
              title={isGoing ? I18n.t('going') : I18n.t('join')}
              onPress={() => {}}
              boxSize={ButtonBoxSize.Contain}
              size={ButtonSize.Default}
              color={isGoing ? 'white' : 'textPrimary'}
              bgColor={isGoing ? 'success' : 'screenBackground'}
              icon={isGoing ? IconNamesEnum.Check : undefined}
              iconPosition={ButtonIconPosition.Right}
            />
            <View style={styles.arrow}>
              <Icon key="icon" name={IconNamesEnum.ArrowRight} size={12} />
            </View>
          </View>
        </View>
      </BluredView>
    </Pressable>
  );
};

export default React.memo<IEventCardProps>(EventCard);
