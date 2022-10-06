import React from 'react';
import {
  FlatList,
  Image,
  Text,
  HStack,
  VStack,
  Box,
  Skeleton,
  Pressable,
} from 'native-base';
import { SvgUri as SvgImage } from 'react-native-svg';
import { useTheme } from 'themes';
import I18n from 'i18n/i18n';
import { NoResults, Loader } from 'views/components/base/ListComponents';
import { ISearchListComponentProps } from '../types';
import gStyles from 'styles/styles';

const SearchListComponent: React.FC<ISearchListComponentProps> = ({
  data,
  dataType,
  onEndReached,
  onSelect,
}) => {
  const { colors } = useTheme();

  const renderItem = React.useCallback(
    ({ item, index }) => {
      const imageSource: null | string = dataType === 'country' ? item.flag : item.logo;

      return (
        <Pressable
          onPress={() =>
            onSelect({
              id: item.id,
              name: dataType === 'country' ? item.code : item.name,
              dataType,
            })
          }
          bg={colors.backgroundCard}
        >
          <HStack
            ml={'4'}
            py={'3'}
            space={'1.5'}
            alignItems={'center'}
            borderTopWidth={index === 0 ? 0 : 0.5}
            borderTopColor={colors.backgroundMessageSent}
          >
            {imageSource && (
              <>
                {imageSource.includes('.svg') ? (
                  <SvgImage uri={imageSource} width={20} height={20} />
                ) : (
                  <Image
                    source={{ uri: imageSource }}
                    alt={item.name}
                    size={'6'}
                    resizeMode={'contain'}
                  />
                )}
              </>
            )}
            <Text variant={'matchTeam'}>{item.name}</Text>
            {dataType === 'country' && <Text variant={'matchDate'}>{item.code}</Text>}
          </HStack>
        </Pressable>
      );
    },
    [colors.backgroundCard, colors.backgroundMessageSent, dataType, onSelect]
  );

  return (
    <VStack flex={1} mt={'3'}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        keyboardDismissMode={'on-drag'}
        ListFooterComponent={data.length ? <Loader /> : null}
        ListEmptyComponent={<NoResults />}
        contentContainerStyle={gStyles.contentContainerStyle}
        ListFooterComponentStyle={gStyles.listFooterComponentStyle}
      />
      <Text variant={'smallText'} px={'6'} mt={'3'} mb={'5'}>
        {I18n.t('joinUs-canChangeTeam')}
      </Text>
    </VStack>
  );
};

export const SearchListLoader: React.FC = () => (
  <Box mt={'6'} px={'4'}>
    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(k => (
      <Skeleton key={'SearchItemComponent' + k} h={46} mt={'px'} />
    ))}
  </Box>
);

export default React.memo<ISearchListComponentProps>(SearchListComponent);
