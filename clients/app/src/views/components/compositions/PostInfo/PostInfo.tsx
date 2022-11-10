import React from 'react';
import { View, Image, Pressable } from 'react-native';
import moment from 'moment';
import I18n from 'i18n/i18n';
import { useTheme } from 'themes';
import { Divider } from 'native-base';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import { commonScreens } from 'views/navigation/screens';
import { getReadableNumber } from 'utils/helpers/readableNumber';
import UltrasText from 'views/components/base/UltrasText';
import Catch from 'views/components/base/Catch';
import Icon from 'views/components/base/Icon';
import { Icons as Icons } from 'assets/icons';
import { PostInfoProps } from '../PostCard';

import styles from './styles';

const PostInfo: React.FC<PostInfoProps> = ({
  imageUri,
  date,
  title,
  content,
  creator,
  supportersClub,
  commentsCount,
  isCaught,
  catchesCount,
}) => {
  const { pushTo } = useNavigationWithParams();
  const { colors } = useTheme();

  return (
    <>
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

      <View style={styles.container}>
        <UltrasText style={styles.date} color="textSecondary">
          {date < new Date()
            ? moment(date).fromNow()
            : moment(date).format('MMM DD, hh:mm')}
        </UltrasText>
        <UltrasText style={styles.title} color="textTertiary">
          {title}
        </UltrasText>
        <UltrasText style={styles.content} color="textSecondary">
          {content}
        </UltrasText>
        <View style={styles.creatorContainer}>
          <Pressable>
            <UltrasText style={styles.creator} color="textPrimary">
              {I18n.t('events-by')} {creator}
              {supportersClub && ', '}
            </UltrasText>
          </Pressable>
          {supportersClub && (
            <Pressable>
              <UltrasText style={styles.creator} color="textSecondary">
                {supportersClub}
              </UltrasText>
            </Pressable>
          )}
        </View>
        <View style={styles.actions}>
          <Icon name={Icons.CommentsCount} color="textSecondary" size={'ic-sm'} />
          <UltrasText style={styles.commentsText} color="textPrimary">
            {getReadableNumber(commentsCount)}
          </UltrasText>
        </View>
      </View>
      <Divider bg={colors.backgroundDividerTransparent} thickness={1} />
    </>
  );
};

export default React.memo<PostInfoProps>(PostInfo);
