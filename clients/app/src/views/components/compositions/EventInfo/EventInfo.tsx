import React from 'react';
import { View, Image, Pressable } from 'react-native';
import moment from 'moment';
import I18n from 'i18n/i18n';
import { useTheme } from 'themes';
import { Divider } from 'native-base';
import VerticalDivider from 'views/components/base/VerticalDivider';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import { commonScreens } from 'views/navigation/screens';
import UltrasText from 'views/components/base/UltrasText';
import Button, {
  SizeEnum as ButtonSize,
  BoxSizeEnum as ButtonBoxSize,
  IconPositionEnum as ButtonIconPosition,
} from 'views/components/base/Button';
import Icon from 'views/components/base/Icon';
import { IconNamesEnum as Icons } from 'assets/icons';
import Like from 'views/components/base/Like';
import Box from 'views/components/base/Box';
import { ProfileListTypeEnum } from 'views/screens/ProfileList';
import { EventInfoProps } from '../EventCard';
import { getReadableNumber } from 'utils/helpers/readableNumber';
import { upperCaseFirstLetter } from 'utils/helpers/string';
import styles from './styles';

const EventInfo: React.FC<EventInfoProps> = ({
  imageUri,
  date,
  title,
  location,
  goingCount,
  likeCount,
  commentsCount, // eslint-disable-line @typescript-eslint/no-unused-vars
  creator,
  supportersClub,
  isGoing,
  isLiked,
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
        <UltrasText style={styles.title} color="textPrimary">
          {title}
        </UltrasText>

        <View style={styles.match}>
          <Button
            title={'Chelsea - Manchester United'}
            onPress={
              () => pushTo(commonScreens.match.name, { id: 67 }) // matchId
            }
            color="textPrimaryInvert"
            bgColor="backgroundCardInvert"
            size={ButtonSize.Small}
            boxSize={ButtonBoxSize.Contain}
          />
        </View>

        {location && (
          <UltrasText style={styles.location} color="textPrimary">
            <Icon name={Icons.Map} size={12} color="textPrimary" /> {location}
          </UltrasText>
        )}
        <View style={styles.creatorContainer}>
          <Pressable
            onPress={
              () => pushTo(commonScreens.profile.name, { id: 67 }) // profileid
            }
          >
            <UltrasText style={styles.creator} color="textSecondary">
              {I18n.t('eventsBy')} {creator}
              {supportersClub && ', '}
            </UltrasText>
          </Pressable>
          {supportersClub && (
            <Pressable
              onPress={
                () => pushTo(commonScreens.fanClub.name, { id: 67 }) // supporterClubsId
              }
            >
              <UltrasText style={styles.creator} color="textAction">
                {supportersClub}
              </UltrasText>
            </Pressable>
          )}
        </View>

        <View style={styles.stats}>
          <Pressable
            onPress={() =>
              pushTo(commonScreens.profileList.name, {
                id: 2,
                type: ProfileListTypeEnum.eventMemebers,
              })
            }
          >
            <UltrasText style={styles.going} color="textSecondary">
              {getReadableNumber(goingCount)} {I18n.t('going')}
            </UltrasText>
          </Pressable>
          <VerticalDivider />
          <Pressable
            onPress={() =>
              pushTo(commonScreens.profileList.name, {
                id: 1,
                type: ProfileListTypeEnum.eventLikes,
              })
            }
          >
            <UltrasText style={styles.going} color="textSecondary">
              {getReadableNumber(likeCount)} {I18n.t('likes')}
            </UltrasText>
          </Pressable>
        </View>

        <View style={styles.actionBox}>
          <View style={styles.goingButton}>
            <Button
              title={isGoing ? upperCaseFirstLetter(I18n.t('going')) : I18n.t('join')}
              onPress={() => {}}
              boxSize={ButtonBoxSize.Cover}
              size={ButtonSize.Big}
              color="textPrimary"
              bgColor="buttonAction"
              icon={isGoing ? Icons.Check : undefined}
              iconPosition={ButtonIconPosition.Right}
            />
          </View>
          <Box
            style={styles.likeButton}
            borderColor={isLiked ? 'buttonAction' : 'buttonActionInvert'}
          >
            <Like isLiked={isLiked} onPress={() => {}} />
          </Box>
        </View>
      </View>
      <Divider bg={colors.backgroundDividerTransparent} thickness={1} />
    </>
  );
};

export default React.memo<EventInfoProps>(EventInfo);
