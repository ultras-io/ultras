import React from 'react';
import { View, Image } from 'react-native';
import I18n from 'i18n/i18n';

import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import { commonScreens } from 'views/navigation/screens';
import { formatDateAndTime } from 'utils/helpers/matchTime';
import { MatchStateEnum } from '../MatchTime';

import Box from 'views/components/base/Box';
import Avatar, { SizeEnum as AvatarSize } from 'views/components/base/Avatar';
import UltrasText from 'views/components/base/UltrasText';
import Button, {
  IconPositionEnum as ButtonIconPosition,
} from 'views/components/base/Button';
import { IconNamesEnum as Icons } from 'assets/icons';
import Divider, { TypeEnum as DividerType } from 'views/components/base/Divider';

import { MatchInfoProps } from '../MatchCard/types';
import styles from './styles';

const MatchInfo: React.FC<MatchInfoProps> = ({
  team1Name,
  team2Name,
  team1URI,
  team2URI,
  league,
  venue,
  score,
  leagueImageURI,
  matchState,
  startTime,
  minute,
}) => {
  const { pushTo } = useNavigationWithParams();

  const { date: formattedDate, time: formattedTime } = React.useMemo(() => {
    return formatDateAndTime(startTime, matchState, minute);
  }, [startTime, matchState, minute]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.team}>
          <Avatar
            onPress={() => pushTo(commonScreens.team.name, { id: team1Name })} // team1Id
            avatarUri={team1URI}
            size={AvatarSize.Big}
            isTeam
          />
          <UltrasText style={styles.teamName} color="text" numberOfLines={2}>
            {team1Name}
          </UltrasText>
        </View>
        <View style={styles.info}>
          <Box bgColor="secondaryText" style={styles.leagueLogoContainer}>
            <Image source={{ uri: leagueImageURI }} style={styles.leagueLogo} />
          </Box>
          <UltrasText color="text" style={styles.leagueVenueText} numberOfLines={1}>
            {league}
          </UltrasText>
          <UltrasText color="tertiaryText" style={styles.date}>
            {formattedDate + ' ' + formattedTime}
          </UltrasText>
          {score && (
            <UltrasText
              style={styles.score}
              color={matchState === MatchStateEnum.Finished ? 'text' : 'success'}
            >
              {score.team1Score || 0}
              {matchState === MatchStateEnum.Penalties &&
                ' (' + (score.team1Penalties || 0) + ')'}
              {' - '}
              {score.team2Score || 0}
              {matchState === MatchStateEnum.Penalties &&
                ' (' + (score.team2Penalties || 0) + ')'}
            </UltrasText>
          )}
          <UltrasText
            color="tertiaryText"
            style={styles.leagueVenueText}
            numberOfLines={2}
          >
            {venue}
          </UltrasText>
        </View>
        <View style={styles.team}>
          <Avatar
            onPress={() => pushTo(commonScreens.team.name, { id: team2Name })} // team2Id
            avatarUri={team2URI}
            size={AvatarSize.Big}
            isTeam
          />
          <UltrasText style={styles.teamName} color="text" numberOfLines={2}>
            {team2Name}
          </UltrasText>
        </View>
      </View>

      <View style={styles.button}>
        <Button
          title={I18n.t('eventsCreate')}
          onPress={() => pushTo(commonScreens.newEvent.name)}
          color="textInvert"
          bgColor="bgColorInvert"
          icon={Icons.Add}
          iconPosition={ButtonIconPosition.Left}
        />
      </View>

      <View style={styles.divider}>
        <Divider type={DividerType.Horizontal} bgColor={'quaternaryText'} />
      </View>
    </>
  );
};

export default React.memo<MatchInfoProps>(MatchInfo);
