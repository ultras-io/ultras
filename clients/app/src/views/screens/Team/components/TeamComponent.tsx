import React from 'react';
import { VStack, HStack, Button } from 'native-base';
import I18n from 'i18n/i18n';
import { useTheme } from 'themes';
import { Divider, Circle, Image, Text } from 'native-base';
import authenticationStore, { IState } from 'stores/authentication';
import { TeamTypesEnum } from '@ultras/utils';
import { ITeamComponentProps } from '../types';

const useAuthenticationStore = authenticationStore.initStore();

const TeamComponent: React.FC<ITeamComponentProps> = ({ data }) => {
  const { colors } = useTheme();

  const userSelector = React.useCallback(() => (state: IState) => state.user, []);
  const user = useAuthenticationStore(userSelector());
  const updateTeams = useAuthenticationStore(authenticationStore.updateTeamsSelector());

  const isFavorite = React.useMemo(
    () => user.teams.indexOf(data.id) !== -1,
    [data.id, user.teams]
  );

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
            onPress={() => updateTeams(data.id)}
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
