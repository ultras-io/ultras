import React from 'react';
import { Image as RNImage } from 'react-native';
import {
  ScrollView,
  VStack,
  HStack,
  Box,
  Button,
  Divider,
  AspectRatio,
  Image,
  Text,
} from 'native-base';
import moment from 'moment';
import I18n from 'i18n/i18n';
import { useTheme } from 'themes';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import preventMultiCalls from 'utils/helpers/preventMultiCalls';
import { commonScreens } from 'views/navigation/screens';
import Icon from 'views/components/base/Icon';
import { Icons } from 'assets/icons';
import { getReadableNumber } from 'utils/helpers/readableNumber';
import { IEventComponentProps } from '../types';
import buildEventMembersStore from 'stores/eventMembers';

const EventComponent: React.FC<IEventComponentProps> = ({ data }) => {
  const { pushTo } = useNavigationWithParams();
  const { colors } = useTheme();
  const [ratio, setRatio] = React.useState(3 / 2);

  const eventMembersStore = React.useMemo(() => buildEventMembersStore(), []);
  const { add: storeAdd, delete: storeDelete } = eventMembersStore.useSelector(
    'add',
    'delete'
  );

  const [isJoined, setIsJoined] = React.useState(data.post.joined || false);

  const onJoinLeavePress = React.useCallback(() => {
    setIsJoined(!isJoined);

    if (isJoined) {
      storeDelete.remove({ eventId: data.id });
    } else {
      storeAdd.setFieldValue('eventId', data.id);
      storeAdd.create();
    }
  }, [isJoined, storeDelete, data.id, storeAdd]);

  React.useEffect(() => {
    setIsJoined(data.post.joined || false);
  }, [data.post.joined]);

  React.useEffect(() => {
    if (storeAdd.status === 'error') {
      setIsJoined(false);
    }
    if (storeDelete.status === 'error') {
      setIsJoined(true);
    }
  }, [isJoined, storeAdd.status, storeDelete.status]);

  React.useLayoutEffect(() => {
    if (data.post.image) {
      RNImage.getSize(data.post.image, (w, h) => {
        setRatio(w / h);
      });
    }
  }, [data.post.image]);

  return (
    <ScrollView>
      {data.post.image && (
        <AspectRatio ratio={{ base: ratio }} width={{ base: 'full' }}>
          <Image
            source={{ uri: data.post.image }}
            alt={data.post.title}
            resizeMode="cover"
          />
        </AspectRatio>
      )}

      <VStack p={4}>
        <Text variant={'cardTime'}>
          {new Date(data.dateTime) < new Date()
            ? moment(data.dateTime).fromNow()
            : moment(data.dateTime).format('MMM DD, hh:mm')}
        </Text>
        <Text variant={'sectionTitle'} mt={'4'} mb={'2'}>
          {data.post.title}
        </Text>
        {data.post.match?.teamHome && data.post.match?.teamAway ? (
          <Button
            variant={'secondaryInvert'}
            mt={'1'}
            mb={'2'}
            onPress={preventMultiCalls(() =>
              pushTo(commonScreens.match.name, { data: data.post.match })
            )}
          >
            {data.post.match?.teamHome.name +
              I18n.t('matches-vs') +
              data.post.match?.teamAway.name}
          </Button>
        ) : (
          <Box h={'8'} />
        )}
        <Text variant={'cardPlace'} mt={'1'}>
          <Icon name={Icons.Map} size={'ic-2xs'} color="textPrimary" />{' '}
          {data.location.name}
        </Text>
        <HStack>
          <Text variant={'cardInfo'}>
            {I18n.t('events-by')}{' '}
            <Text
              fontWeight={700}
              onPress={preventMultiCalls(() =>
                pushTo(commonScreens.profile.name, { data: data.post.author })
              )}
              suppressHighlighting
            >
              {data.post.author.username}
            </Text>
            {data.post.fanClub && (
              <Text>
                ,{' '}
                <Text
                  variant={'cardInfo'}
                  color={colors.textAction}
                  fontWeight={700}
                  onPress={preventMultiCalls(() =>
                    pushTo(commonScreens.fanClub.name, { data: data.post.fanClub })
                  )}
                  suppressHighlighting
                >
                  {data.post.fanClub.name}
                </Text>
              </Text>
            )}
          </Text>
        </HStack>
        <Text variant={'cardStats'} mt={'1'}>
          {getReadableNumber(2763)} {I18n.t('common-going')}
        </Text>
      </VStack>

      <HStack mx={'4'} space={'5'} alignItems={'center'}>
        <Button
          rightIcon={
            <Icon
              name={isJoined ? Icons.Check : Icons.ArrowForward}
              color={isJoined ? 'iconPrimary' : 'iconPrimaryInvert'}
              size={'ic-xs'}
            />
          }
          variant={isJoined ? 'actionInvert' : 'action'}
          flex={1}
          onPress={onJoinLeavePress}
        >
          {I18n.t(isJoined ? 'events-going' : 'events-join')}
        </Button>
        <Icon name={Icons.Catch} color={'iconPrimary'} size={'ic-md'} />
        <Icon name={Icons.Comments} color={'iconPrimary'} size={'ic-md'} />
      </HStack>

      <Divider bg={colors.backgroundDividerTransparent} thickness={1} mt={5} />

      <Text variant={'standard'} p={4}>
        {data.post.content}
      </Text>
    </ScrollView>
  );
};

export default React.memo<IEventComponentProps>(EventComponent);
