import React from 'react';
import {FlatList, View} from 'react-native';

import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';

import SupportersClubInfo from 'views/components/compositions/SupportersClubInfo';

import EventCard from 'views/components/compositions/EventCard';
import PostCard from 'views/components/compositions/PostCard';
import UltrasText from 'views/components/base/UltrasText';

import {ISupportersClubComponentProps} from '../types';
import styles from '../styles';
import gStyles from 'styles/styles';

const SupportersClubComponent: React.FC<ISupportersClubComponentProps> = ({
  data,
}) => {
  const {setOptions} = useNavigationWithParams();

  const onScroll = React.useCallback(
    ({nativeEvent}) => {
      setOptions({
        headerTitle: () => (
          <UltrasText
            style={gStyles.screenTitle}
            color={'tertiary'}
            numberOfLines={1}>
            {nativeEvent.contentOffset.y > 40 ? data.name : ''}
          </UltrasText>
        ),
      });
    },
    [data.name, setOptions],
  );

  const renderColumn = React.useCallback(
    ({item}) => (
      <View style={styles.flatListItem}>
        {item.type === 'event' ? (
          <EventCard
            image={
              'https://i2-prod.football.london/incoming/article19846274.ece/ALTERNATES/s1200/0_GettyImages-1302327332.jpg'
            }
            date={new Date(2021, 8, 10)}
            title={
              'Celebrate all things Chelsea FC, the reigning Champions of Europe, at the Annual Lunch 2021.'
            }
            creator={'s.bridge'}
            commentsCount={2560}
            goingCount={120900}
            isGoing={true}
            isLiked={true}
          />
        ) : (
          <PostCard
            date={new Date(2021, 9, 9)}
            title={
              "Romelu Lukaku's transfer to Chelsea from Inter Milan has been finalised"
            }
            supportersClub={'Absolute Chelsea'}
            commentsCount={37}
            isFollowing={false}
          />
        )}
      </View>
    ),
    [],
  );

  return (
    <FlatList
      keyExtractor={item => item.id.toString()}
      showsHorizontalScrollIndicator={false}
      renderItem={renderColumn}
      data={data.feed}
      onScroll={onScroll}
      scrollEventThrottle={160}
      ListHeaderComponent={
        <SupportersClubInfo
          avatarUri={data.avatarUri}
          name={data.name}
          isOfficial={data.isOfficial}
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
