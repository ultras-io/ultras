import React from 'react';
import {ImageBackground, ScrollView, Alert, View} from 'react-native';

import UltrasText from 'views/components/base/UltrasText';

import Button, {
  SizeEnum as ButtonSize,
  BoxSizeEnum as ButtonBoxSize,
  AppearanceEnum as ButtonAppearance,
  IconPositionEnum as ButtonIconPosition,
} from 'views/components/base/Button';
import Avatar, {SizeEnum as AvatarSize} from 'views/components/base/Avatar';
import {WithBadge, SizeEnum as BadgeSize} from 'views/components/base/Badge';
import {IconNamesEnum} from '../../../assets/icons';
import Divider, {TypeEnum as DividerType} from 'views/components/base/Divider';

import CommentsCount from 'views/components/base/CommentsCount';
import Like from 'views/components/base/Like';

import MatchTime, {
  MatchStateEnum as MatcheTimeState,
} from 'views/components/compositions/MatchTime';

import MatchCard from 'views/components/compositions/MatchCard';
import Input, {TypeEnum as InputType} from 'views/components/base/Input';
import PhoneInput from 'views/components/compositions/PhoneInput';

import PostCard from 'views/components/compositions/PostCard';
import EventCard from 'views/components/compositions/EventCard';
import SupportersClubCard from 'views/components/compositions/SupportersClubCard';
import TeamCard from 'views/components/compositions/TeamCard';

import styles from './styles';
import gStyles from 'styles/styles';

const avatarUri =
  'https://instagram.fevn1-4.fna.fbcdn.net/v/t51.2885-19/s320x320/163650366_582341719356091_276870700844455813_n.jpg?_nc_ht=instagram.fevn1-4.fna.fbcdn.net&_nc_ohc=bFJHgQ-xwOkAX8WGSbe&edm=ABfd0MgBAAAA&ccb=7-4&oh=48c3ef745ef2eb0269b41acc83c4fb16&oe=61682632&_nc_sid=7bff83';

const romanoUri =
  'https://instagram.fevn1-4.fna.fbcdn.net/v/t51.2885-19/s320x320/242809702_469878950673668_7726857470160677314_n.jpg?_nc_ht=instagram.fevn1-4.fna.fbcdn.net&_nc_ohc=ADqqarorL1EAX_SB4-F&edm=ABfd0MgBAAAA&ccb=7-4&oh=9f05f765d78e4ecf72aad4e62a94e3e5&oe=61696472&_nc_sid=7bff83';

const rlUri =
  'https://instagram.fevn1-4.fna.fbcdn.net/v/t51.2885-19/s150x150/65280369_508538103219999_1200879938362671104_n.jpg?_nc_ht=instagram.fevn1-4.fna.fbcdn.net&_nc_ohc=0mi-ZtEFyX0AX-EVXEV&edm=ABfd0MgBAAAA&ccb=7-4&oh=0da3c68602fbb18395eb87a8db288e5c&oe=61694F61&_nc_sid=7bff83';

const UIKit: React.FC = () => {
  const log = () => {
    Alert.alert('Pressed');
  };

  const randomDate = (start: Date, end: Date): Date => {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime()),
    );
  };

  return (
    <ImageBackground
      source={require('../../../assets/images/bg.png')}
      resizeMode="cover"
      style={gStyles.containerBg}>
      <ScrollView style={styles.container}>
        <UltrasText style={styles.title}>UI Kit</UltrasText>

        <UltrasText style={styles.subTitle}>Comments Count</UltrasText>
        <View style={styles.rowContainer}>
          <View style={styles.rowItem}>
            <CommentsCount count={0} />
          </View>
          <View style={styles.rowItem}>
            <CommentsCount count={2} />
          </View>
          <View style={styles.rowItem}>
            <CommentsCount count={25} />
          </View>
          <View style={styles.rowItem}>
            <CommentsCount count={432} />
          </View>
          <View style={styles.rowItem}>
            <CommentsCount count={2455} />
          </View>
          <View style={styles.rowItem}>
            <CommentsCount count={24354} />
          </View>
          <View style={styles.rowItem}>
            <CommentsCount count={243544} />
          </View>
          <View style={styles.rowItem}>
            <CommentsCount count={2432254} />
          </View>
          <View style={styles.rowItem}>
            <CommentsCount count={24600354} />
          </View>
          <View style={styles.rowItem}>
            <CommentsCount count={246003540} />
          </View>
          <View style={styles.rowItem}>
            <CommentsCount count={8460035904} />
          </View>
        </View>

        <UltrasText style={styles.subTitle}>Like</UltrasText>
        <Like onPress={() => {}} />
        <Like isLiked onPress={() => {}} />

        <UltrasText style={styles.subTitle}>Button</UltrasText>

        <Button
          title="Button"
          onPress={log}
          appearance={ButtonAppearance.Outline}
          boxSize={ButtonBoxSize.Contain}
          size={ButtonSize.Default}
          color="text"
          bgColor="primary"
          icon={IconNamesEnum.Hearth}
          iconPosition={ButtonIconPosition.Left}
        />

        <UltrasText style={styles.subTitle}>Input</UltrasText>

        <View style={{width: 200, marginTop: 10}}>
          <Input name="Name" />
        </View>
        <View style={{width: 260, marginTop: 10}}>
          <PhoneInput />
        </View>
        <View style={{width: 120, marginTop: 10}}>
          <Input name="Phone Number" type={InputType.Phone} />
        </View>
        <View style={{width: 180, marginTop: 10}}>
          <Input name="Email" type={InputType.Email} />
        </View>

        <UltrasText style={styles.subTitle}>Event Card</UltrasText>

        <EventCard
          date={randomDate(new Date(2021, 10, 10), new Date(2021, 11, 11))}
          title={
            'Celebrate all things Chelsea FC, the reigning Champions of Europe, at the Annual Lunch 2021.'
          }
          creator={'s.bridge'}
          commentsCount={2560}
          goingCount={120900}
          isGoing={true}
          isLiked={true}
        />
        <EventCard
          image={
            'https://i2-prod.football.london/incoming/article19846274.ece/ALTERNATES/s1200/0_GettyImages-1302327332.jpg'
          }
          date={randomDate(new Date(2021, 10, 10), new Date(2021, 11, 11))}
          title={'Watching Euro 2020 Final Together'}
          location={'Paulaner Beerhouse'}
          creator={'kirilbelsky'}
          supportersClub={'Absolute Chelsea'}
          commentsCount={37}
          goingCount={124}
          isGoing={false}
          isLiked={true}
        />
        <EventCard
          date={randomDate(new Date(2021, 10, 10), new Date(2021, 11, 11))}
          title={'Chelsea vs Villarreal 2021 UEFA Super Cup'}
          location={'Dargett Brewpab'}
          creator={'g.brzęczyszczykiewicz'}
          commentsCount={0}
          goingCount={12}
          isGoing={false}
          isLiked={false}
        />

        <UltrasText style={styles.subTitle}>Post Card</UltrasText>
        <PostCard
          date={randomDate(new Date(2021, 10, 10), new Date(2021, 11, 11))}
          title={
            "Romelu Lukaku's transfer to Chelsea from Inter Milan has been finalised"
          }
          supportersClub={'Absolute Chelsea'}
          commentsCount={37}
          isFollowing={false}
        />

        <UltrasText style={styles.subTitle}>Supporters Club Card</UltrasText>
        <SupportersClubCard
          name="Juventus Official Fan Club Russia"
          ultrasCount={48920}
          city="Moscow"
          avatarUri={rlUri}
        />
        <SupportersClubCard
          name="Chelsea Pulse"
          ultrasCount={122389}
          city="London"
          avatarUri={romanoUri}
        />
        <SupportersClubCard
          name="Juventus Սեվ Սպիտակ Բանակ"
          ultrasCount={2389}
          city="Yerevan"
          avatarUri={avatarUri}
        />

        <UltrasText style={styles.subTitle}>Team Card</UltrasText>
        <TeamCard
          name="AS Rome"
          supportersClubsCount={47}
          city="Rome"
          country="Italy"
          avatarUri={romanoUri}
        />
        <TeamCard
          name="Chelsea FC"
          supportersClubsCount={129}
          city="London"
          country="England"
          avatarUri={rlUri}
        />
        <TeamCard
          name="Italy"
          supportersClubsCount={900}
          avatarUri={avatarUri}
        />

        <UltrasText style={styles.subTitle}>Match Card</UltrasText>
        <MatchCard
          team1Name={'Union Berlin'}
          team2Name={'Borussia Mönchengladbach'}
          team1URI={
            'https://media.api-sports.io/football/teams/' +
            Math.round(Math.random() * (4000 - 1) + 1) +
            '.png'
          }
          team2URI={
            'https://media.api-sports.io/football/teams/' +
            Math.round(Math.random() * (4000 - 1) + 1) +
            '.png'
          }
          country={'Germany'}
          league={'Bundesliga'}
          // score,
          leagueImageURI={
            'https://media.api-sports.io/football/leagues/' +
            Math.round(Math.random() * (55 - 1) + 1) +
            '.png'
          }
          startTime={randomDate(new Date(2021, 10, 10), new Date(2021, 11, 11))}
        />

        <MatchCard
          matchState={MatcheTimeState.Penalties}
          team1Name={'Barcelona'}
          team2Name={'Benfica'}
          team1URI={
            'https://media.api-sports.io/football/teams/' +
            Math.round(Math.random() * (4000 - 1) + 1) +
            '.png'
          }
          team2URI={
            'https://media.api-sports.io/football/teams/' +
            Math.round(Math.random() * (4000 - 1) + 1) +
            '.png'
          }
          league={'Champions League'}
          score={{
            team1Score: 2,
            team2Score: 2,
            team1Penalties: 3,
            team2Penalties: 4,
          }}
          leagueImageURI={
            'https://media.api-sports.io/football/leagues/' +
            Math.round(Math.random() * (55 - 1) + 1) +
            '.png'
          }
          startTime={randomDate(new Date(2021, 10, 10), new Date(2021, 11, 11))}
        />

        <MatchCard
          matchState={MatcheTimeState.Live}
          minute={76}
          team1Name={'Liverpool'}
          team2Name={'Manchester United'}
          team1URI={
            'https://media.api-sports.io/football/teams/' +
            Math.round(Math.random() * (4000 - 1) + 1) +
            '.png'
          }
          team2URI={
            'https://media.api-sports.io/football/teams/' +
            Math.round(Math.random() * (4000 - 1) + 1) +
            '.png'
          }
          country={'England'}
          league={'Premier League'}
          score={{team1Score: 3, team2Score: 1}}
          leagueImageURI={
            'https://media.api-sports.io/football/leagues/' +
            Math.round(Math.random() * (55 - 1) + 1) +
            '.png'
          }
          startTime={randomDate(new Date(2021, 10, 10), new Date(2021, 11, 11))}
        />

        <MatchCard
          matchState={MatcheTimeState.Finished}
          team1Name={'Arsenal'}
          team2Name={'Valencis'}
          team1URI={
            'https://media.api-sports.io/football/teams/' +
            Math.round(Math.random() * (4000 - 1) + 1) +
            '.png'
          }
          team2URI={
            'https://media.api-sports.io/football/teams/' +
            Math.round(Math.random() * (4000 - 1) + 1) +
            '.png'
          }
          league={'Europa League'}
          score={{team1Score: 2, team2Score: 1}}
          leagueImageURI={
            'https://media.api-sports.io/football/leagues/' +
            Math.round(Math.random() * (55 - 1) + 1) +
            '.png'
          }
          startTime={randomDate(new Date(2021, 10, 10), new Date(2021, 11, 11))}
        />

        <UltrasText style={styles.subTitle}>Match Time</UltrasText>
        <View style={styles.rowContainer}>
          <View style={styles.rowItem}>
            <MatchTime
              leagueImageURI={
                'https://media.api-sports.io/football/leagues/' +
                Math.round(Math.random() * (55 - 1) + 1) +
                '.png'
              }
              startTime={randomDate(
                new Date(2021, 10, 10),
                new Date(2021, 11, 11),
              )}
            />
          </View>
          <View style={styles.rowItem}>
            <MatchTime
              matchState={MatcheTimeState.Live}
              minute={Math.round(Math.random() * (95 - 1) + 1)}
              leagueImageURI={
                'https://media.api-sports.io/football/leagues/' +
                Math.round(Math.random() * (55 - 1) + 1) +
                '.png'
              }
            />
          </View>
          <View style={styles.rowItem}>
            <MatchTime
              matchState={MatcheTimeState.ExtraTime}
              minute={Math.round(Math.random() * (123 - 91) + 91)}
              leagueImageURI={
                'https://media.api-sports.io/football/leagues/' +
                Math.round(Math.random() * (55 - 1) + 1) +
                '.png'
              }
            />
          </View>
          <View style={styles.rowItem}>
            <MatchTime
              matchState={MatcheTimeState.Penalties}
              leagueImageURI={
                'https://media.api-sports.io/football/leagues/' +
                Math.round(Math.random() * (55 - 1) + 1) +
                '.png'
              }
            />
          </View>
          <View style={styles.rowItem}>
            <MatchTime
              matchState={MatcheTimeState.Finished}
              leagueImageURI={
                'https://media.api-sports.io/football/leagues/' +
                Math.round(Math.random() * (55 - 1) + 1) +
                '.png'
              }
              startTime={randomDate(new Date(2021, 8, 8), new Date())}
            />
          </View>
        </View>

        <UltrasText style={styles.subTitle}>Divider</UltrasText>
        <View style={styles.rowContainer}>
          <View style={styles.rowItem}>
            <UltrasText>Some Text</UltrasText>
          </View>
          <View style={styles.rowItem}>
            <Divider />
          </View>
          <View style={styles.rowItem}>
            <UltrasText>Another One</UltrasText>
          </View>
        </View>

        <View style={styles.card}>
          <Divider type={DividerType.Horizontal} />
          <UltrasText>28.08.21</UltrasText>
          <UltrasText>20:30</UltrasText>
          <Divider type={DividerType.Horizontal} />
        </View>

        <View style={styles.rowContainer}>
          <View style={styles.rowItem}>
            <UltrasText>Lorem Ipsum</UltrasText>
          </View>
          <View style={styles.rowItem}>
            <Divider type={DividerType.Vertical} />
          </View>
          <View style={styles.rowItem}>
            <UltrasText>Dolor Sit</UltrasText>
          </View>
        </View>

        <UltrasText style={styles.subTitle}>Avatar & Badge</UltrasText>
        <View style={styles.rowContainer}>
          <View style={styles.rowItem}>
            <WithBadge number={24} size={BadgeSize.Big} bgColor="danger">
              <Avatar uri={avatarUri} size={AvatarSize.Big} />
            </WithBadge>
          </View>
          <View style={styles.rowItem}>
            <WithBadge
              number={43768}
              size={BadgeSize.Big}
              bgColor="secondary"
              color="danger">
              <Avatar uri={romanoUri} size={AvatarSize.Big} />
            </WithBadge>
          </View>
          <View style={styles.rowItem}>
            <WithBadge number={54} size={BadgeSize.Small}>
              <Avatar uri={rlUri} />
            </WithBadge>
          </View>
          <View style={styles.rowItem}>
            <Avatar uri={rlUri} size={AvatarSize.Small} />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default UIKit;
