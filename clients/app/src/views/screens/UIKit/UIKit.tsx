import React from 'react';
import {ScrollView, Alert, View} from 'react-native';

import UltrasText from 'views/components/base/UltrasText';

import Button, {
  SizeEnum as ButtonSize,
  ColorEnum as ButtonColor,
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

import MatchCard, {
  Score as MatchScore,
} from 'views/components/compositions/MatchCard';

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
          <WithBadge number={24} size={BadgeSize.Big} color={BadgeColor.Danger}>
            <Avatar uri={avatarUri} size={AvatarSize.Big} />
          </WithBadge>
        </View>
        <View style={styles.rowItem}>
          <WithBadge
            number={43768}
            size={BadgeSize.Big}
            color={BadgeColor.Primary}>
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

      <UltrasText style={styles.subTitle}>Button</UltrasText>
      <UltrasText style={styles.section}>Sizes</UltrasText>
      <>
        <Button title="Join Us" onPress={log} size={ButtonSize.Small} />
        <Button title="Join Us" onPress={log} size={ButtonSize.Default} />
        <Button
          title="Push Join Us Here Extra Long"
          onPress={log}
          size={ButtonSize.Big}
        />
      </>
      <UltrasText style={styles.section}>Colors</UltrasText>
      <>
        <Button title="Join Us" onPress={log} color={ButtonColor.Primary} />
        <Button title="Join Us" onPress={log} color={ButtonColor.Danger} />
        <Button title="Huhu" onPress={log} color={ButtonColor.Secondary} />
        <Button title="Huhu" onPress={log} color={ButtonColor.Default} />
      </>
      <UltrasText style={styles.section}>Appearance</UltrasText>
      <>
        <Button
          title="Join Us"
          onPress={log}
          appearance={ButtonAppearance.Minimal}
        />
        <Button
          title="Join Us"
          onPress={log}
          appearance={ButtonAppearance.Default}
        />
        <Button
          title="Push Join Us Here Extra Long"
          onPress={log}
          appearance={ButtonAppearance.Outline}
        />
      </>
      <UltrasText style={styles.section}>Icon</UltrasText>
      <>
        <Button
          onPress={log}
          icon={IconNamesEnum.Hearth}
          size={ButtonSize.Small}
        />
        <Button
          onPress={log}
          icon={IconNamesEnum.Hearth}
          color={ButtonColor.Danger}
        />
        <Button
          onPress={log}
          icon={IconNamesEnum.Hearth}
          size={ButtonSize.Big}
          color={ButtonColor.Primary}
        />
        <Button
          title="Going"
          onPress={log}
          size={ButtonSize.Small}
          icon={IconNamesEnum.Hearth}
          iconPosition={ButtonIconPosition.Left}
          color={ButtonColor.Secondary}
        />
        <Button
          title="Love"
          onPress={log}
          icon={IconNamesEnum.Hearth}
          color={ButtonColor.Primary}
        />
        <Button
          title="Love"
          onPress={log}
          icon={IconNamesEnum.Hearth}
          iconPosition={ButtonIconPosition.Left}
          size={ButtonSize.Big}
        />
      </>
      <UltrasText style={styles.section}>Loading, Disabled</UltrasText>
      <>
        <Button title="Go" onPress={log} isLoading />
        <Button title="Home" onPress={log} isLoading size={ButtonSize.Small} />
        <Button
          title="Love"
          onPress={log}
          isDisabled
          icon={IconNamesEnum.Hearth}
          iconPosition={ButtonIconPosition.Left}
          size={ButtonSize.Big}
        />
      </>
    </ScrollView>
  );
};

export default UIKit;
