import React from 'react';
import { Divider, Avatar, Pressable, Text, HStack, VStack } from 'native-base';
import VerticalDivider from 'views/components/base/VerticalDivider';
import I18n from 'i18n/i18n';
import { useTheme } from 'themes';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import { commonScreens } from 'views/navigation/screens';
import { getReadableNumber } from 'utils/helpers/readableNumber';
import { ProfileListTypeEnum } from 'views/screens/ProfileList';
import { IFanClubInfoProps } from './types';

const FanClubInfo: React.FC<IFanClubInfoProps> = ({ data }) => {
  const { pushTo } = useNavigationWithParams();
  const { colors } = useTheme();

  return (
    <>
      <HStack px={5} py={5}>
        <Avatar
          size="av-xl"
          mr={5}
          bg={colors.iconUpdatesCount}
          source={{ uri: data.avatar }}
        />
        <VStack flex={'1'}>
          <Text
            variant={'sectionHeader'}
            fontFamily={'Montserrat'}
            fontWeight={'600'}
            fontSize={'4xl'}
            lineHeight={'sm'}
            numberOfLines={3}
            letterSpacing={'-0.24px'}
            mb={1}
          >
            {data.name}
          </Text>
          <HStack>
            <Pressable
              onPress={() =>
                pushTo(commonScreens.profileList.name, {
                  id: data.id,
                  type: ProfileListTypeEnum.fanClubMembers,
                })
              }
            >
              <Text variant={'quinary'} fontSize={'lg'}>
                {getReadableNumber(data.membersCount)} {I18n.t('ultras')}
              </Text>
            </Pressable>
            <VerticalDivider />
            <Text variant={'quinary'} fontSize={'lg'}>
              {data.city.name}
            </Text>
          </HStack>

          <Pressable onPress={() => pushTo(commonScreens.team.name, { data: data.team })}>
            <HStack>
              {/* <Icon /> */}
              <Text variant={'quinary'} fontSize={'xl'} fontWeight={'700'}>
                {data.team.name}
              </Text>
            </HStack>
          </Pressable>

          {/* <View >
            <Button
              title={I18n.t('fanClubJoin')}
              onPress={() => {}}
              color="textPrimaryInvert"
              bgColor="buttonAction"
              icon={Icons.ArrowRightSquare}
              iconPosition={ButtonIconPosition.Left}
            />
          </View> */}
        </VStack>
      </HStack>
      <Divider bg={colors.backgroundDividerTransparent} thickness={1} />
    </>
  );
};

export default React.memo<IFanClubInfoProps>(FanClubInfo);
