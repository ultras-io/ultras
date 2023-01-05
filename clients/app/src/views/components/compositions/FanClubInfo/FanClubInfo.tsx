import { AwsS3ThumbnailEnum } from '@ultras/utils';
import React from 'react';
import { Avatar, Text, HStack, VStack } from 'native-base';
import Icon from 'views/components/base/Icon';
import { Icons as Icons } from 'assets/icons';
import VerticalDivider from 'views/components/base/VerticalDivider';
import I18n from 'i18n/i18n';
import { useTheme } from 'themes';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import { commonScreens } from 'views/navigation/screens';
import { getReadableNumber } from 'utils/helpers/readableNumber';
import preventMultiCalls from 'utils/helpers/preventMultiCalls';
import { ProfileListTypeEnum } from 'views/screens/ProfileList';
import { IFanClubInfoProps } from './types';
import FanClubJoinButton from './FanClubJoinButton';
import { getFanClubAvatar } from 'utils/helpers/image';

const FanClubInfo: React.FC<IFanClubInfoProps> = ({ data }) => {
  const avatarURI = React.useMemo(() => {
    return getFanClubAvatar(AwsS3ThumbnailEnum.size110x110, data.avatar);
  }, [data.avatar]);

  const { pushTo } = useNavigationWithParams();
  const { colors } = useTheme();

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
    <HStack p={5}>
      <Avatar
        size="av-xl"
        mr={5}
        bg={colors.iconPrimaryInvert}
        source={{ uri: avatarURI }}
      />
      <VStack flex={'1'}>
        <Text variant={'sectionTitle'} lineHeight={'sm'} numberOfLines={3} mb={1}>
          {data.name}
        </Text>
        <HStack>
          <Text
            key={'membersCount'}
            variant={'info'}
            onPress={preventMultiCalls(openMembersList)}
            suppressHighlighting
          >
            {getReadableNumber(data.membersCount)} {I18n.t('common-ultras')}
          </Text>
          {data.city && (
            <>
              <VerticalDivider />
              <Text variant={'info'}>{data.city.name}</Text>
            </>
          )}
        </HStack>

        {data.team ? (
          <HStack alignItems={'center'} space={'1'}>
            <Icon name={Icons.Club} color="iconPrimary" size={'ic-2xs'} />
            <Text
              variant={'info'}
              onPress={preventMultiCalls(openTeam)}
              suppressHighlighting
            >
              {data.team.name}
            </Text>
          </HStack>
        ) : (
          <HStack space={'1'} h={'5'} />
        )}

        <FanClubJoinButton data={data} />
      </VStack>
    </HStack>
  );
};

export default React.memo<IFanClubInfoProps>(FanClubInfo);
