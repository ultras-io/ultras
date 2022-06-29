import React from 'react';
import { Dimensions } from 'react-native';
import {
  FlatList,
  VStack,
  HStack,
  Pressable,
  Circle,
  Image,
  Text,
  Skeleton,
} from 'native-base';
import I18n from 'i18n/i18n';
import { useTheme } from 'themes';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import preventMultiCalls from 'utils/helpers/preventMultiCalls';
import { commonScreens } from 'views/navigation/screens';
import { ITeamsComponentProps } from '../types';

const windowWidth = Dimensions.get('window').width;

const TeamsComponent: React.FC<ITeamsComponentProps> = ({ data }) => {
  const { colors } = useTheme();
  const { pushTo } = useNavigationWithParams();

  const renderColumn = React.useCallback(
    ({ item }) => (
      <Pressable
        onPress={preventMultiCalls(() =>
          pushTo(commonScreens.team.name, { data: item.team })
        )}
      >
        <Circle size={'av-lg'} bg={colors.backgroundLogo} mr={'3'}>
          <Image
            source={{ uri: item.team.logo }}
            size={'av-sm'}
            resizeMode={'contain'}
            alt={item.team.name}
          />
        </Circle>
      </Pressable>
    ),
    [colors.backgroundLogo, pushTo]
  );

  return (
    <VStack mb={'2'}>
      <Text variant={'searchTitle'} ml={'5'} mr={'2'} my={'3'}>
        {I18n.t('teams')}
      </Text>
      <FlatList
        pl={'5'}
        contentContainerStyle={{ paddingRight: 25 }}
        keyExtractor={item => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={renderColumn}
        data={data}
        horizontal={true}
        bounces={data.length >= Math.round(windowWidth / 72)}
      />
    </VStack>
  );
};

export const TeamsLoader: React.FC = () => (
  <VStack mb={'2'} mt={'.5'}>
    <Skeleton.Text lines={1} w={'20'} ml={'5'} mr={'2'} my={'4'} />
    <HStack pl={'5'}>
      {[0, 1, 2].map(k => (
        <Skeleton key={'team' + k} w={74} h={74} rounded={'full'} mr={'2.5'} />
      ))}
    </HStack>
  </VStack>
);

export default TeamsComponent;
