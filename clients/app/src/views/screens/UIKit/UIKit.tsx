import React from 'react';
import { ImageBackground, ScrollView, Alert, View } from 'react-native';
import {
  MatchScoreTypesEnum,
  MatchStatusesEnum,
  TeamTypesEnum,
  WinnerEnum,
} from '@ultras/utils';

import UltrasText from 'views/components/base/UltrasText';

import Button, {
  SizeEnum as ButtonSize,
  BoxSizeEnum as ButtonBoxSize,
  AppearanceEnum as ButtonAppearance,
  IconPositionEnum as ButtonIconPosition,
} from 'views/components/base/Button';
import Avatar, { SizeEnum as AvatarSize } from 'views/components/base/Avatar';
import { WithBadge, SizeEnum as BadgeSize } from 'views/components/base/Badge';
import { IconNamesEnum } from '../../../assets/icons';
import Divider, { TypeEnum as DividerType } from 'views/components/base/Divider';

import CommentsCount from 'views/components/base/CommentsCount';
import Like from 'views/components/base/Like';

import MatchTime from 'views/components/compositions/MatchTime';

import MatchCard from 'views/components/compositions/MatchCard';
import Input, { TypeEnum as InputType } from 'views/components/base/Input';
import PhoneInput from 'views/components/compositions/PhoneInput';

import PostCard from 'views/components/compositions/PostCard';
import EventCard from 'views/components/compositions/EventCard';
import FanClubCard from 'views/components/compositions/FanClubCard';
import TeamCard from 'views/components/compositions/TeamCard';
import ProfileCard from 'views/components/compositions/ProfileCard';

import styles from './styles';
import gStyles from 'styles/styles';
import {
  CityViewModel,
  CountryViewModel,
  LeagueViewModel,
  MatchViewModel,
  TeamViewModel,
  VenueViewModel,
} from '@ultras/view-models';

const avatarUri =
  'https://scontent.fevn7-1.fna.fbcdn.net/v/t1.6435-9/32169146_1783474055029715_6295390250172678144_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=Hp_9LsVB_REAX-mxiOt&_nc_ht=scontent.fevn7-1.fna&oh=00_AT9r9Cl3ev2t9b368CXm20vT-BqfzRIsTv7alfxQix7w8w&oe=62B0E32D';

const romanoUri =
  'https://scontent.fevn7-1.fna.fbcdn.net/v/t39.30808-6/242302660_259166456210396_1299395807171773616_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=OSY0iK8L8mAAX-vZFgk&_nc_ht=scontent.fevn7-1.fna&oh=00_AT97wh2WECIw0fxfbE3_OW1vz-cKckx_jGYzZErHkdW0BA&oe=628FA51C';

const rlUri = 'https://seeklogo.com/images/C/chelsea-fc-logo-A24FEB6BFB-seeklogo.com.png';

const log = () => {
  Alert.alert('Pressed');
};

const randomDate = (start: Date | null = null, end: Date | null = null): Date => {
  if (!start) {
    start = new Date('2000-01-01');
  }
  if (!end) {
    end = new Date('2050-12-31');
  }

  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const randomDateString = (start: Date | null = null, end: Date | null = null): string => {
  return randomDate(start, end).toString();
};

const randomNumber = (min: number = 1, max: number = 4000): number => {
  return Math.round(Math.random() * (max - 1) + min);
};

const randomString = (length: number = 10): string => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; ++i) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
};

const randomLogo = (type: string): string => {
  return `https://media.api-sports.io/football/${type}/${randomNumber(1, 100)}.png`;
};
const randomCountryFlag = (code: string): string => {
  return `https://media.api-sports.io/flags/${code.toLowerCase()}.svg`;
};

const randomLeagueLogo = () => randomLogo('leagues');
const randomTeamLogo = () => randomLogo('teams');
const randomVenueLogo = () => randomLogo('venues');

const generateCountry = (name: string): CountryViewModel => {
  const codes = ['AL', 'AR', 'AM', 'AU', 'BR', 'BG', 'IR', 'IQ', 'IL', 'IT', 'JP', 'KZ'];
  const code = codes[Math.floor(Math.random() * codes.length)];

  return {
    id: randomNumber(1, 300),
    name: name,
    code: randomString(2).toUpperCase(),
    flag: randomCountryFlag(code),
    telPrefix: '+123',
  };
};

const generateCity = (name: string): CityViewModel => ({
  id: randomNumber(1, 300),
  name: name,
  country: generateCountry('Test Country'),
});

const generateVenue = (venueName: string): VenueViewModel => ({
  id: randomNumber(1, 10000000),
  name: venueName,
  address: 'Venue Address Example',
  capacity: randomNumber(1000, 500000),
  city: generateCity('Test City'),
  country: generateCountry('Test Country'),
  imageUri: randomVenueLogo(),
});

const generateLeague = (name: string): LeagueViewModel => ({
  id: randomNumber(1, 20000),
  name: name,
  logo: randomLeagueLogo(),
  country: generateCountry('Test Country'),
});

const generateTeam = (name: string): TeamViewModel => ({
  id: randomNumber(1, 800000),
  name: name,
  logo: randomTeamLogo(),
  type: randomNumber(0, 10) > 5 ? TeamTypesEnum.national : TeamTypesEnum.club,
  founded: randomNumber(1900, 2020),
  venue: generateVenue('Test Venue'),
  city: generateCity('Test City'),
  country: generateCountry('Test Country'),
});

const generateMatch = (status: MatchStatusesEnum): MatchViewModel => {
  const elapsedTime = randomNumber(0, 90);
  const goalsHome = randomNumber(0, 6);
  const goalsAway = randomNumber(0, 6);

  return {
    id: randomNumber(1, 32000000),
    teamHome: generateTeam('Test Team Home'),
    teamAway: generateTeam('Test Team Away'),
    league: generateLeague('Test League'),
    venue: generateVenue('Test Venue'),
    dateTime: randomDate().toString(),
    elapsedTime: elapsedTime,
    goalsHome: goalsHome,
    goalsAway: goalsAway,
    status: status,
    winner:
      goalsHome > goalsAway
        ? WinnerEnum.home
        : goalsHome < goalsAway
        ? WinnerEnum.away
        : WinnerEnum.draw,
    score: {
      id: randomNumber(1, 400000000),
      home: goalsHome,
      away: goalsAway,
      type: MatchScoreTypesEnum.penalties,
    },
  };
};

const commentsCountList = [
  0, 2, 25, 432, 2455, 24354, 243544, 2432254, 24600354, 246003540, 8460035904,
];

const UIKit: React.FC = () => {
  return (
    <ImageBackground
      source={require('../../../assets/images/bg.png')}
      resizeMode="cover"
      style={gStyles.containerBg}
    >
      <ScrollView style={styles.container}>
        <UltrasText style={styles.title}>UI Kit</UltrasText>
        <UltrasText style={styles.subTitle}>Comments Count</UltrasText>
        <View style={styles.rowContainer}>
          {commentsCountList.map((count: number) => (
            <View key={`comments-count-${count}`} style={styles.rowItem}>
              <CommentsCount count={count} />
            </View>
          ))}
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
        <View style={{ width: 200, marginTop: 10 }}>
          <Input name="Name" />
        </View>
        <View style={{ width: 260, marginTop: 10 }}>
          <PhoneInput />
        </View>
        <View style={{ width: 120, marginTop: 10 }}>
          <Input name="Phone Number" type={InputType.Phone} />
        </View>
        <View style={{ width: 180, marginTop: 10 }}>
          <Input name="Email" type={InputType.Email} />
        </View>
        <UltrasText style={styles.subTitle}>Event Card</UltrasText>
        <EventCard
          imageUri={
            'https://i2-prod.football.london/incoming/article19846274.ece/ALTERNATES/s1200/0_GettyImages-1302327332.jpg'
          }
          date={randomDate(new Date(2021, 8, 10), new Date(2021, 11, 11))}
          title={
            'Celebrate all things Chelsea FC, the reigning Champions of Europe, at the Annual Lunch 2021.'
          }
          creator={'s.bridge'}
          commentsCount={2560}
          goingCount={120900}
          isGoing={true}
          isLiked={true}
          onPress={() => {}}
        />
        <EventCard
          date={randomDate(new Date(2021, 8, 10), new Date(2021, 11, 11))}
          title={'Watching Euro 2020 Final Together'}
          location={'Paulaner Beerhouse'}
          creator={'kirilbelsky'}
          fanClub={'Absolute Chelsea'}
          commentsCount={37}
          goingCount={124}
          isGoing={false}
          isLiked={true}
          onPress={() => {}}
        />
        <EventCard
          date={randomDate(new Date(2021, 8, 10), new Date(2021, 11, 11))}
          title={'Chelsea vs Villarreal 2021 UEFA Super Cup'}
          location={'Dargett Brewpab'}
          creator={'g.brzęczyszczykiewicz'}
          commentsCount={0}
          goingCount={12}
          isGoing={false}
          isLiked={false}
          onPress={() => {}}
        />
        <UltrasText style={styles.subTitle}>Post Card</UltrasText>
        <PostCard
          date={randomDate(new Date(2021, 1, 10), new Date(2021, 9, 9))}
          title={
            "Romelu Lukaku's transfer to Chelsea from Inter Milan has been finalised"
          }
          fanClub={'Absolute Chelsea'}
          commentsCount={37}
          isFollowing={false}
        />
        <PostCard
          date={new Date(2021, 9, 20, 14, 23)}
          title={
            'Chelsea squad revealed for Malmo Champions League tie as Christian Pulisic suffers fresh setback'
          }
          fanClub={'Moscow Blues'}
          commentsCount={337}
          isFollowing={true}
        />
        <UltrasText style={styles.subTitle}>Fan Club Card</UltrasText>
        <FanClubCard
          data={{
            name: 'Juventus Official Fan Club Russia',
            ultrasCount: 48920,
            avatar: avatarUri,
            city: generateCity('Moscow'),
          }}
        />
        <FanClubCard
          data={{
            name: 'Chelsea Pulse',
            ultrasCount: 122389,
            avatar: romanoUri,
            city: generateCity('London'),
          }}
        />
        <FanClubCard
          data={{
            name: 'Juventus Սեվ Սպիտակ Բանակ',
            ultrasCount: 2389,
            avatar: avatarUri,
            city: generateCity('Yerevan'),
          }}
        />
        <View style={styles.rowContainer}>
          <View style={styles.rowItem}>
            <FanClubCard
              data={{
                name: 'Juventus Official Fan Club Russia',
                ultrasCount: 48920,
                avatar: avatarUri,
                city: generateCity('Moscow'),
              }}
              direction="horizontal"
            />
          </View>
          <View style={styles.rowItem}>
            <FanClubCard
              data={{
                name: 'Chelsea Pulse',
                ultrasCount: 122389,
                avatar: romanoUri,
                city: generateCity('London'),
              }}
              direction="horizontal"
            />
          </View>
          <FanClubCard
            data={{
              name: 'Juventus Official Club Russia Official Fan Club Juventus Official Fan Russia',
              ultrasCount: 48920,
              avatar: avatarUri,
              city: generateCity('Moscow'),
            }}
            direction="horizontal"
          />
        </View>
        <UltrasText style={styles.subTitle}>Team Card</UltrasText>
        <TeamCard
          name="AS Rome"
          fanClubsCount={47}
          city="Rome"
          country="Italy"
          avatarUri={romanoUri}
          onPress={() => {}}
        />
        <TeamCard
          name="Chelsea FC"
          fanClubsCount={129}
          city="London"
          country="England"
          avatarUri={rlUri}
          onPress={() => {}}
        />
        <TeamCard
          name="Italy"
          fanClubsCount={900}
          avatarUri={avatarUri}
          onPress={() => {}}
        />
        <UltrasText style={styles.subTitle}>Ultras Card</UltrasText>

        <ProfileCard
          name="Nathaniel Chalobah"
          username={'chalobah'}
          avatarUri={avatarUri}
          onPress={() => {}}
        />

        <UltrasText style={styles.subTitle}>Match Card</UltrasText>
        <MatchCard data={generateMatch(MatchStatusesEnum.finished)} onPress={() => {}} />
        <MatchCard data={generateMatch(MatchStatusesEnum.penalties)} onPress={() => {}} />
        <MatchCard data={generateMatch(MatchStatusesEnum.live)} onPress={() => {}} />
        <MatchCard data={generateMatch(MatchStatusesEnum.canceled)} onPress={() => {}} />

        <UltrasText style={styles.subTitle}>Match Time</UltrasText>
        <View style={styles.rowContainer}>
          <View style={styles.rowItem}>
            <MatchTime
              matchStatus={MatchStatusesEnum.finished}
              leagueLogoURI={randomLeagueLogo()}
              dateTime={randomDateString(new Date(2021, 10, 10), new Date(2021, 11, 11))}
            />
          </View>
          <View style={styles.rowItem}>
            <MatchTime
              matchStatus={MatchStatusesEnum.live}
              leagueLogoURI={randomLeagueLogo()}
              dateTime={randomDateString(new Date(2021, 10, 10), new Date(2021, 11, 11))}
            />
          </View>
          <View style={styles.rowItem}>
            <MatchTime
              matchStatus={MatchStatusesEnum.extraTime}
              leagueLogoURI={randomLeagueLogo()}
              dateTime={randomDateString(new Date(2021, 10, 10), new Date(2021, 11, 11))}
            />
          </View>
          <View style={styles.rowItem}>
            <MatchTime
              matchStatus={MatchStatusesEnum.penalties}
              leagueLogoURI={randomLeagueLogo()}
              dateTime={randomDateString(new Date(2021, 10, 10), new Date(2021, 11, 11))}
            />
          </View>
          <View style={styles.rowItem}>
            <MatchTime
              matchStatus={MatchStatusesEnum.finished}
              leagueLogoURI={randomLeagueLogo()}
              dateTime={randomDateString(new Date(2021, 8, 8), new Date())}
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
              <Avatar avatarUri={avatarUri} size={AvatarSize.Big} />
            </WithBadge>
          </View>
          <View style={styles.rowItem}>
            <WithBadge
              number={43768}
              size={BadgeSize.Big}
              bgColor="secondary"
              color="danger"
            >
              <Avatar avatarUri={romanoUri} size={AvatarSize.Big} />
            </WithBadge>
          </View>
          <View style={styles.rowItem}>
            <WithBadge number={54} size={BadgeSize.Small}>
              <Avatar avatarUri={rlUri} />
            </WithBadge>
          </View>
          <View style={styles.rowItem}>
            <Avatar avatarUri={rlUri} size={AvatarSize.Small} />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default UIKit;
