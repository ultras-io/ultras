import React from 'react';
import {ScrollView, Alert, View} from 'react-native';

import UltrasText from 'views/components/base/UltrasText';

import Button, {
  SizeEnum as ButtonSize,
  BoxSizeEnum as ButtonBoxSize,
  AppearanceEnum as ButtonAppearance,
  IconPositionEnum as ButtonIconPosition,
} from 'views/components/base/Button';
import Avatar, {SizeEnum as AvatarSize} from 'views/components/base/Avatar';
import {
  WithBadge,
  SizeEnum as BadgeSize,
  ColorEnum as BadgeColor,
} from 'views/components/base/Badge';
import {IconNamesEnum} from '../../../assets/icons';
import Divider, {TypeEnum as DividerType} from 'views/components/base/Divider';

import MatchTime, {
  MatchStateEnum as MatcheTimeState,
} from 'views/components/compositions/MatchTime';

import MatchCard from 'views/components/compositions/MatchCard';
import Input, {TypeEnum as InputType} from 'views/components/base/Input';
import PhoneInput from 'views/components/compositions/PhoneInput';

import FourDigitsContainer from 'views/containers/FourDigitsContainer';

import {IUIKitProps} from './types';
import styles from './styles';

const avatarUri =
  'https://instagram.fevn1-4.fna.fbcdn.net/v/t51.2885-19/s320x320/209318028_231713268577743_6245281435767734030_n.jpg?_nc_ht=instagram.fevn1-4.fna.fbcdn.net&_nc_ohc=CuBw9LjriNAAX_0cPDD&tn=sKVAP798p6JBPzPQ&edm=ABfd0MgBAAAA&ccb=7-4&oh=5b4b8b1067c81b0c520646486b6b7e14&oe=615C0585&_nc_sid=7bff83';

const romanoUri =
  'https://instagram.fevn1-4.fna.fbcdn.net/v/t51.2885-19/s320x320/12825782_1686181148337278_445906028_a.jpg?_nc_ht=instagram.fevn1-4.fna.fbcdn.net&_nc_ohc=Q9nDcP7Z4YIAX9gwwyh&edm=ABfd0MgBAAAA&ccb=7-4&oh=0ff24f917679ad4938224419cb9eb7fa&oe=615C57F1&_nc_sid=7bff83';

const rlUri =
  'https://instagram.fevn1-4.fna.fbcdn.net/v/t51.2885-19/s320x320/241823380_830172197641351_4125620187399622783_n.jpg?_nc_ht=instagram.fevn1-4.fna.fbcdn.net&_nc_ohc=4pv9H9K5NFsAX9XKPs0&edm=ABfd0MgBAAAA&ccb=7-4&oh=c2de87fdbf6ca2f34e4acb2f41f16294&oe=615B54E6&_nc_sid=7bff83';

const UIKit: React.FC<IUIKitProps> = () => {
  const log = () => {
    Alert.alert('Pressed');
  };

  const randomDate = (start: Date, end: Date): Date => {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime()),
    );
  };

  return (
    <ScrollView style={styles.container}>
      <UltrasText style={styles.title}>UI Kit</UltrasText>

      <UltrasText style={styles.subTitle}>Button</UltrasText>

      <Button
        title="Like"
        onPress={log}
        appearance={ButtonAppearance.Outline}
        boxSize={ButtonBoxSize.Contain}
        size={ButtonSize.Default}
        color="lightText"
        bgColor="lightText"
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
  );
};

export default UIKit;
