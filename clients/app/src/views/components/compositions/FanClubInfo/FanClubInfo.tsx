import React from 'react';
import { Avatar, Button, Pressable, Text, HStack, VStack } from 'native-base';
import Icon from 'views/components/base/Icon';
import { IconNamesEnum as Icons } from 'assets/icons';
import VerticalDivider from 'views/components/base/VerticalDivider';
import I18n from 'i18n/i18n';
import { useTheme } from 'themes';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import { commonScreens } from 'views/navigation/screens';
import { getReadableNumber } from 'utils/helpers/readableNumber';
import prevertMulticalls from 'utils/helpers/prevertMulticalls';
import { ProfileListTypeEnum } from 'views/screens/ProfileList';
import { IFanClubInfoProps } from './types';

const FanClubInfo: React.FC<IFanClubInfoProps> = ({ data }) => {
  const { pushTo } = useNavigationWithParams();
  const { colors } = useTheme();

  const isJoined = false;

  const openMembersList = React.useCallback(
    () =>
      pushTo(commonScreens.profileList.name, {
        id: data.id,
        type: ProfileListTypeEnum.fanClubMembers,
      }),
    [data.id, pushTo]
  );

  const openTeam = React.useCallback(
    () => pushTo(commonScreens.team.name, { data: data.team }),
    [data.team, pushTo]
  );

  return (
    <HStack px={5} py={5}>
      <Avatar
        size="av-xl"
        mr={5}
        bg={colors.iconPrimaryInvert}
        source={{ uri: data.avatar }}
      />
      <VStack flex={'1'}>
        <Text variant={'sectionTitle'} lineHeight={'sm'} numberOfLines={3} mb={1}>
          {data.name}
        </Text>
        <HStack>
          <Pressable onPress={prevertMulticalls(() => openMembersList())}>
            <Text variant={'info'}>
              {getReadableNumber(data.membersCount)} {I18n.t('ultras')}
            </Text>
          </Pressable>
          <VerticalDivider />
          <Text variant={'info'}>{data.city.name}</Text>
        </HStack>

        <Pressable onPress={prevertMulticalls(() => openTeam())}>
          <HStack alignItems={'center'} space={'1'}>
            <Icon name={Icons.Team} color="textSecondary" size={'ic-2xs'} />
            <Text variant={'info'}>{data.team.name}</Text>
          </HStack>
        </Pressable>

        <Button
          onPress={() => {}}
          leftIcon={
            <Icon
              name={isJoined ? Icons.Check : Icons.ArrowForward}
              color={isJoined ? 'iconPrimary' : 'iconPrimaryInvert'}
              size={'ic-xs'}
            />
          }
          variant={isJoined ? 'actionInvert' : 'action'}
          mt={'3'}
          mr={'4'}
        >
          {I18n.t(isJoined ? 'joined' : 'fanClubJoin')}
        </Button>
      </VStack>
    </HStack>
  );
};

export default React.memo<IFanClubInfoProps>(FanClubInfo);
