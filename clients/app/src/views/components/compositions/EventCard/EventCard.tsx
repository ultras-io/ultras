import React from 'react';
import {View, Image} from 'react-native';
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
import {IconNamesEnum} from 'assets/icons';
import {getReadableNumber} from 'utils/helpers/readableNumber';

import {IEventCardProps} from './types';
import styles from './styles';

const EventCard: React.FC<IEventCardProps> = ({
  image,
  date,
  title,
  location,
  goingCount,
  commentsCount,
  creator,
  supportersClub,
  isGoing,
  isLiked,
}) => {
  return (
    <BluredView style={styles.container}>
      {image && <Image source={{uri: image}} style={styles.image} />}
      <View style={styles.innerContainer}>
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
        <UltrasText style={styles.smallText} color="tertiaryText">
          {getReadableNumber(goingCount)} {I18n.t('going')}
        </UltrasText>
        {location && (
          <UltrasText style={styles.location} color="secondaryText">
            {location}
          </UltrasText>
        )}
        <UltrasText style={styles.smallText} color="text">
          {I18n.t('eventsEventBy')} {creator}
          {supportersClub && ', ' + supportersClub}
        </UltrasText>
        <View style={styles.bottomButtons}>
          <View style={styles.comments}>
            <Like isLiked={isLiked} onPress={() => {}} />
          </View>
          <View style={styles.comments}>
            <CommentsCount count={commentsCount} />
          </View>
          <Button
            title={isGoing ? I18n.t('joined') : I18n.t('join')}
            onPress={() => {}}
            boxSize={ButtonBoxSize.Contain}
            size={ButtonSize.Default}
            color="text"
            bgColor="primary"
            icon={IconNamesEnum.Hearth}
            iconPosition={ButtonIconPosition.Right}
          />
          <View style={styles.arrow}>
            <Icon key="icon" name={IconNamesEnum.ArrowRight} size={12} />
          </View>
        </View>
      </View>
    </BluredView>
  );
};

export default React.memo<IEventCardProps>(EventCard);
