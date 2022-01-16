import React from 'react';
import { FlatList, View } from 'react-native';

import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import commonScreens from 'navigation/commonScreens';

import SupportersClubInfo from 'views/components/compositions/SupportersClubInfo';

import EventCard from 'views/components/compositions/EventCard';
import PostCard from 'views/components/compositions/PostCard';
import UltrasText from 'views/components/base/UltrasText';

import { ISupportersClubComponentProps } from '../types';
import styles from '../styles';
import gStyles from 'styles/styles';

const SupportersClubComponent: React.FC<ISupportersClubComponentProps> = ({ data }) => {
  const { setOptions, pushTo } = useNavigationWithParams();

  const onScroll = React.useCallback(
    ({ nativeEvent }) => {
      let alpha = (nativeEvent.contentOffset.y - 30) / (70 - 30);
      if (alpha < 0) alpha = 0;
      else if (alpha > 1) alpha = 1;
      setOptions({
        headerTitle: () => (
          <UltrasText
            style={[gStyles.screenTitle, { opacity: alpha }]}
            color={'tertiary'}
            numberOfLines={1}
          >
            {data.name}
          </UltrasText>
        ),
      });
    },
    [data.name, setOptions]
  );

  const renderColumn = React.useCallback(
    ({ item }) => (
      <View style={styles.flatListItem}>
        {item.type === 'event' ? (
          <EventCard
            onPress={() => pushTo(commonScreens.event, { id: 23 })} //eventId
            imageUri={
              'https://i2-prod.football.london/incoming/article19846274.ece/ALTERNATES/s1200/0_GettyImages-1302327332.jpg'
            }
            date={new Date(2021, 10, 4)}
            title={
              'Celebrate all things Chelsea FC, the reigning Champions of Europe, at the Annual Lunch 2021.'
            }
            creator={'s.bridge'}
            commentsCount={2560}
            likeCount={130}
            goingCount={120900}
            isGoing={true}
            isLiked={true}
          />
        ) : (
          <PostCard
            onPress={() => pushTo(commonScreens.post, { id: 23 })} //postId
            date={new Date(2021, 9, 9)}
            title={
              "Romelu Lukaku's transfer to Chelsea from Inter Milan has been finalised"
            }
            creator={'abu.hagob'}
            commentsCount={37}
            isLiked={false}
            likeCount={345}
          />
        )}
      </View>
    ),
    [pushTo]
  );

  return (
    <FlatList
      keyExtractor={item => item.id.toString()}
      showsHorizontalScrollIndicator={false}
      renderItem={renderColumn}
      data={data.feed}
      onScroll={onScroll}
      scrollEventThrottle={16}
      ListHeaderComponent={
        <SupportersClubInfo
          avatarUri={data.avatarUri}
          name={data.name}
          ultrasCount={data.ultrasCount}
          city={data.city}
          team={data.team}
          myStatus={data.myStatus}
        />
      }
    />
  );
};

export default SupportersClubComponent;
