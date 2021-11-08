import React from 'react';
import {View, Image, Pressable} from 'react-native';
import moment from 'moment';
import I18n from 'i18n/i18n';

import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import commonScreens from 'navigation/commonScreens';

import UltrasText from 'views/components/base/UltrasText';
import Button, {
  SizeEnum as ButtonSize,
  BoxSizeEnum as ButtonBoxSize,
  IconPositionEnum as ButtonIconPosition,
} from 'views/components/base/Button';
import Icon from 'views/components/base/Icon';
import {IconNamesEnum as Icons} from 'assets/icons';
import Like from 'views/components/base/Like';
import Box from 'views/components/base/Box';
import Divider, {TypeEnum as DividerType} from 'views/components/base/Divider';
import {EventInfoProps} from '../EventCard';

import {getReadableNumber} from 'utils/helpers/readableNumber';
import {upperCaseFirstLetter} from 'utils/helpers/string';

import styles from './styles';

const EventInfo: React.FC<EventInfoProps> = ({
  imageUri,
  date,
  title,
  location,
  goingCount,
  likeCount,
  commentsCount,
  creator,
  supportersClub,
  isGoing,
  isLiked,
}) => {
  const {pushTo} = useNavigationWithParams();

  return (
    <>
      {imageUri && <Image source={{uri: imageUri}} style={styles.image} />}

      <View style={styles.container}>
        <UltrasText style={styles.date} color="secondaryText">
          {date < new Date()
            ? moment(date).fromNow()
            : moment(date).format('MMM DD, hh:mm')}
        </UltrasText>
        <UltrasText style={styles.title} color="tertiary">
          {title}
        </UltrasText>

        <View style={styles.match}>
          <Button
            title={'Chelsea - Manchester United'}
            onPress={
              () => pushTo(commonScreens.match, {id: 67}) // matchId
            }
            color="textInvert"
            bgColor="opacityBgColorInvert"
            size={ButtonSize.Small}
            boxSize={ButtonBoxSize.Contain}
          />
        </View>

        {location && (
          <UltrasText style={styles.location} color="secondaryText">
            <Icon name={Icons.Map} size={12} color="secondaryText" /> {location}
          </UltrasText>
        )}
        <View style={styles.creatorContainer}>
          <Pressable
            onPress={
              () => pushTo(commonScreens.profile, {id: 67}) // profileid
            }>
            <UltrasText style={styles.creator} color="text">
              {I18n.t('eventsBy')} {creator}
              {supportersClub && ', '}
            </UltrasText>
          </Pressable>
          {supportersClub && (
            <Pressable
              onPress={
                () => pushTo(commonScreens.supportersClub, {id: 67}) // supporterClubsId
              }>
              <UltrasText style={styles.creator} color="secondary">
                {supportersClub}
              </UltrasText>
            </Pressable>
          )}
        </View>

        <UltrasText style={styles.going} color="tertiaryText">
          {getReadableNumber(goingCount)} {I18n.t('going')}
          <View style={styles.divider}>
            <Divider type={DividerType.Vertical} />
          </View>
          {getReadableNumber(likeCount)} {I18n.t('likes')}
        </UltrasText>

        <View style={styles.actionBox}>
          <View style={styles.goingButton}>
            <Button
              title={
                isGoing ? upperCaseFirstLetter(I18n.t('going')) : I18n.t('join')
              }
              onPress={() => {}}
              boxSize={ButtonBoxSize.Cover}
              size={ButtonSize.Big}
              color="text"
              bgColor="success"
              icon={Icons.Check}
              iconPosition={ButtonIconPosition.Right}
            />
          </View>
          <Box style={styles.likeButton} borderColor="quaternaryText">
            <Like isLiked={isLiked} onPress={() => {}} />
          </Box>
        </View>
      </View>
      <View style={styles.dividerH}>
        <Divider type={DividerType.Horizontal} bgColor={'quaternaryText'} />
      </View>
    </>
  );
};

export default React.memo<EventInfoProps>(EventInfo);
