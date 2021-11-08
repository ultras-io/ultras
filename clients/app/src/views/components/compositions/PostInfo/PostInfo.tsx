import React from 'react';
import {View, Image, Pressable} from 'react-native';
import moment from 'moment';
import I18n from 'i18n/i18n';

import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import commonScreens from 'navigation/commonScreens';
import {getReadableNumber} from 'utils/helpers/readableNumber';

import UltrasText from 'views/components/base/UltrasText';
import Like from 'views/components/base/Like';
import Icon from 'views/components/base/Icon';
import {IconNamesEnum as Icons} from 'assets/icons';
import Divider, {TypeEnum as DividerType} from 'views/components/base/Divider';
import {PostInfoProps} from '../PostCard';

import styles from './styles';

const PostInfo: React.FC<PostInfoProps> = ({
  imageUri,
  date,
  title,
  content,
  creator,
  supportersClub,
  commentsCount,
  isLiked,
  likeCount,
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
        <UltrasText style={styles.content} color="secondaryText">
          {content}
        </UltrasText>
        <View style={styles.creatorContainer}>
          <Pressable
            onPress={
              () => pushTo(commonScreens.profile, {id: 67}) // profileId
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
        <View style={styles.actions}>
          <View style={styles.like}>
            <Like isLiked={isLiked} count={likeCount} onPress={() => {}} />
          </View>
          <Icon name={Icons.CommentsCount} color="secondaryText" size={20} />
          <UltrasText style={styles.commentsText} color="text">
            {getReadableNumber(commentsCount)}
          </UltrasText>
        </View>
      </View>
      <View style={styles.dividerH}>
        <Divider type={DividerType.Horizontal} bgColor={'quaternaryText'} />
      </View>
    </>
  );
};

export default React.memo<PostInfoProps>(PostInfo);
