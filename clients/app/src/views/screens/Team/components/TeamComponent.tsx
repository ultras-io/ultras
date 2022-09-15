import React from 'react';
import { VStack, HStack, Button } from 'native-base';
import I18n from 'i18n/i18n';
import { useTheme } from 'themes';
import { Divider, Circle, Image, Text } from 'native-base';
import authenticationStore, { IState } from 'stores/authentication';
import buildFavoriteTeamsStore from 'stores/favoriteTeams';
import { TeamTypesEnum } from '@ultras/utils';
import { ITeamComponentProps } from '../types';

const useAuthenticationStore = authenticationStore.initStore();
const favoriteTeamsStore = buildFavoriteTeamsStore();

const TeamComponent: React.FC<ITeamComponentProps> = ({ data }) => {
  const { colors } = useTheme();

  const userSelector = React.useCallback(() => (state: IState) => state.user, []);
  const user = useAuthenticationStore(userSelector());
  const addTeam = useAuthenticationStore(authenticationStore.addTeamSelector());
  const removeTeam = useAuthenticationStore(authenticationStore.removeTeamSelector());

  const teamIdRef = React.useRef(0);
  const addStatusRef = React.useRef('');
  const deleteStatusRef = React.useRef('');

  const isFavorite = React.useMemo(
    () => user.teams.indexOf(data.id) !== -1,
    [data.id, user.teams]
  );

  const onUpdateTeamsPress = React.useCallback(
    (teamId: ResourceIdentifier) => {
      teamIdRef.current = teamId;
      if (isFavorite) {
        favoriteTeamsStore.remove({ teamId });
        removeTeam(teamId);
      } else {
        favoriteTeamsStore.setAddFieldValue('teamId', teamId);
        favoriteTeamsStore.create();
        addTeam(teamId);
      }
    },
    [isFavorite, addTeam, removeTeam]
  );

  const statuses = favoriteTeamsStore.useSelector('add', 'delete');

  const revertActionOnError = React.useCallback(() => {
    if (addStatusRef.current === 'loading' && statuses.add.status === 'error')
      removeTeam(teamIdRef.current);

    if (deleteStatusRef.current === 'loading' && statuses.delete.status === 'error')
      addTeam(teamIdRef.current);

    addStatusRef.current = statuses.add.status;
    deleteStatusRef.current = statuses.delete.status;
  }, [addTeam, removeTeam, statuses.add.status, statuses.delete.status]);

  React.useEffect(revertActionOnError, [
    revertActionOnError,
    statuses.add.status,
    statuses.delete.status,
  ]);

  return (
    <>
      <HStack p={5}>
        <Circle size={'av-xl'} bg={colors.backgroundLogo} mr={'5'}>
          <Image
            source={{ uri: data.logo }}
            size={'av-lg'}
            resizeMode={'contain'}
            alt={data.name}
          />
        </Circle>

        <VStack flex={1}>
          <Text variant={'sectionTitle'} numberOfLines={2}>
            {data.name}
          </Text>

          <Text variant={'info'}>
            {data.type === TeamTypesEnum.club
              ? (data.city?.name || '') + ', ' + (data.country?.name || '')
              : I18n.t('team-national')}
          </Text>

          <Button
            onPress={() => onUpdateTeamsPress(data.id)}
            variant={isFavorite ? 'actionInvert' : 'action'}
            mt={'3'}
            mr={'4'}
          >
            {I18n.t(isFavorite ? 'team-added' : 'team-add')}
          </Button>
        </VStack>
      </HStack>

      <Divider bg={colors.backgroundDividerTransparent} thickness={1} />
    </>
  );
};

export default TeamComponent;
