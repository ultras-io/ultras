import React from 'react';
import { Image as RNImage } from 'react-native';
import {
  ScrollView,
  VStack,
  HStack,
  Divider,
  AspectRatio,
  Image,
  Text,
  Button,
} from 'native-base';
import moment from 'moment';
import I18n from 'i18n/i18n';
import { useTheme } from 'themes';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import preventMultiCalls from 'utils/helpers/preventMultiCalls';
import { commonScreens } from 'views/navigation/screens';
import Icon from 'views/components/base/Icon';
import Catch, { CatchTypeEnum } from 'views/components/base/Catch';
import buildRoomCatchesStore from 'stores/roomCatches';
import { Icons } from 'assets/icons';
// import { getReadableNumber } from 'utils/helpers/readableNumber';
import { IRoomComponentProps } from '../types';

const RoomComponent: React.FC<IRoomComponentProps> = ({ data }) => {
  const { pushTo } = useNavigationWithParams();
  const { colors } = useTheme();
  const [ratio, setRatio] = React.useState(3 / 2);

  const roomCatchesStore = React.useMemo(() => buildRoomCatchesStore(), []);

  const { add: storeCatchesAdd, delete: storeCatchesDelete } =
    roomCatchesStore.useSelector('add', 'delete');

  const [isCaught, setIsCaught] = React.useState(data.post.caught || false);

  const onCatchPress = React.useCallback(() => {
    setIsCaught(!isCaught);

    if (isCaught) {
      storeCatchesDelete.remove({ roomId: data.id });
    } else {
      storeCatchesAdd.setFieldValue('roomId', data.id);
      storeCatchesAdd.create();
    }
  }, [isCaught, data.id, storeCatchesAdd, storeCatchesDelete]);

  React.useEffect(() => {
    setIsCaught(data.post.caught || false);
  }, [data.post.caught]);

  React.useEffect(() => {
    if (storeCatchesAdd.status === 'error') {
      setIsCaught(false);
    }
    if (storeCatchesDelete.status === 'error') {
      setIsCaught(true);
    }
  }, [isCaught, storeCatchesAdd.status, storeCatchesDelete.status]);

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

        <Text variant={'sectionTitle'} my={'2'}>
          {data.post.title}
        </Text>
        <Text variant={'standard'} mb={'2'}>
          {data.post.content}
        </Text>

        <HStack>
          <Text variant={'cardInfo'}>
            {I18n.t('rooms-by')}{' '}
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
      </VStack>

      <HStack mx={'4'} space={'5'} alignItems={'center'}>
        <Button
          leftIcon={
            <Icon name={Icons.Notifications} color={'iconPrimary'} size={'ic-xs'} />
          }
          variant={'actionInvert'}
          flex={1}
        >
          {I18n.t('rooms-subscribe')}
        </Button>

        <Catch
          catchType={CatchTypeEnum.room}
          catchResourceId={data.id}
          count={data.post.catchesCount}
          isCaught={isCaught}
          onPress={onCatchPress}
        />
      </HStack>

      <Divider bg={colors.backgroundDividerTransparent} thickness={1} mt={5} />
    </ScrollView>
  );
};

export default React.memo<IRoomComponentProps>(RoomComponent);
