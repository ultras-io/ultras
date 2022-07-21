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

const EventComponent: React.FC<IEventComponentProps> = ({ data }) => {
  const { pushTo } = useNavigationWithParams();
  const { colors } = useTheme();
  const [ratio, setRatio] = React.useState(3 / 2);

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
          rightIcon={<Icon name={Icons.Check} color={'iconPrimary'} size={'ic-xs'} />}
          variant={'actionInvert'}
          flex={1}
        >
          {I18n.t('events-going')}
        </Button>
        <Icon name={Icons.Like} color={'iconPrimary'} size={'ic-md'} />
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
