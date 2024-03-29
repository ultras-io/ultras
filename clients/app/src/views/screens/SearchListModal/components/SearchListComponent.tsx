import React from 'react';
import { Image, Text, HStack, VStack, Box, Skeleton, Pressable } from 'native-base';
import { SvgUri as SvgImage } from 'react-native-svg';
import { useTheme } from 'themes';
import I18n from 'i18n/i18n';
import { ISearchListComponentProps } from '../types';
import gStyles from 'styles/styles';
import FlatList from 'views/components/base/FlatList/FlatList';
import { InputSection } from 'views/components/base/InputSection';

const SearchListComponent: React.FC<ISearchListComponentProps> = ({
  loading,
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
    [colors.backgroundMessageSent, dataType, onSelect]
  );

  return (
    <VStack flex={1} mt={'3'}>
      <InputSection bg={colors.backgroundCard} padding={0} marginX={4}>
        <FlatList
          loading={loading}
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          onEndReached={onEndReached}
          keyboardDismissMode={'on-drag'}
          contentContainerStyle={gStyles.contentContainerStyle}
          ListFooterComponentStyle={gStyles.listFooterComponentStyle}
        />
      </InputSection>
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
