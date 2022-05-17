import React from 'react';
import { View, Image } from 'react-native';
import I18n from 'i18n/i18n';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import { commonScreens } from 'views/navigation/screens';
import MatchScore from 'views/components/base/MatchScore';
import { formatDateAndTime, isMatchGoing } from 'utils/helpers/matchTime';
import { MatchStatusesEnum } from '@ultras/utils';
import Box from 'views/components/base/Box';
import Avatar, { SizeEnum as AvatarSize } from 'views/components/base/Avatar';
import UltrasText from 'views/components/base/UltrasText';
import Button, {
  IconPositionEnum as ButtonIconPosition,
} from 'views/components/base/Button';
import { IconNamesEnum as Icons } from 'assets/icons';
import Divider, { TypeEnum as DividerType } from 'views/components/base/Divider';
import { IMatchInfoProps } from '../MatchCard/types';
import styles from './styles';

const MatchInfo: React.FC<IMatchInfoProps> = ({ data }) => {
  const { pushTo } = useNavigationWithParams();

  const { date: formattedDate, time: formattedTime } = React.useMemo(() => {
    return formatDateAndTime(data.dateTime, data.status, data.elapsedTime);
  }, [data.dateTime, data.status, data.elapsedTime]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.team}>
          <Avatar
            onPress={() => pushTo(commonScreens.team.name, { id: data.teamHome.id })}
            avatarUri={data.teamHome.logo}
            size={AvatarSize.Big}
            isTeam
          />
          <UltrasText style={styles.teamName} color="text" numberOfLines={2}>
            {data.teamHome.name}
          </UltrasText>
        </View>
        <View style={styles.info}>
          <Box bgColor="secondaryText" style={styles.leagueLogoContainer}>
            <Image source={{ uri: data.league.logo }} style={styles.leagueLogo} />
          </Box>
          <UltrasText color="text" style={styles.leagueVenueText} numberOfLines={1}>
            {data.league.name}
          </UltrasText>
          {/* @TODO - show game minute for live matches */}
          {isMatchGoing(data.status) || data.status === MatchStatusesEnum.finished ? (
            <View style={styles.score}>
              <MatchScore
                score={data.goalsHome || 0}
                // penalties={score.team1Penalties || 0}
                matchStatus={data.status}
                size={'big'}
              />
              <UltrasText color="text" style={styles.scoreDivider}>
                {' '}
                -{' '}
              </UltrasText>
              <MatchScore
                score={data.goalsAway || 0}
                // penalties={score.team1Penalties || 0}
                matchStatus={data.status}
                size={'big'}
              />
            </View>
          ) : (
            <>
              <UltrasText color="tertiaryText" style={styles.date}>
                {formattedDate}
              </UltrasText>
              <UltrasText color="secondaryText" style={styles.time}>
                {formattedTime}
              </UltrasText>
            </>
          )}
          <UltrasText
            color="tertiaryText"
            style={styles.leagueVenueText}
            numberOfLines={2}
          >
            {data.venue.name}
          </UltrasText>
        </View>
        <View style={styles.team}>
          <Avatar
            onPress={() => pushTo(commonScreens.team.name, { id: data.teamAway.id })} // team2Id
            avatarUri={data.teamAway.logo}
            size={AvatarSize.Big}
            isTeam
          />
          <UltrasText style={styles.teamName} color="text" numberOfLines={2}>
            {data.teamAway.name}
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

export default React.memo<IMatchInfoProps>(MatchInfo);
