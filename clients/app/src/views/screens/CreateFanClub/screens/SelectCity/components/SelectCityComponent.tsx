import React from 'react';
import { SafeAreaView } from 'react-native';
import { Box, Divider, FlatList, Pressable, Text } from 'native-base';
import { useTheme } from 'themes';
import { Loader, NoResults } from 'views/components/base/ListComponents';
import { InputSection } from 'views/components/base/InputSection';
import { ISelectCityComponentProps } from '../types';

const SelectCityComponent: React.FC<ISelectCityComponentProps> = ({
  loading,
  data,
  // cityId,
  onSelect,
  onEndReached,
}) => {
  const { colors } = useTheme();

  const renderCity = React.useCallback(
    ({ item, index }) => {
      const onPress = () => onSelect(item.id);

      return (
        <>
          <Pressable paddingX={15} marginBottom={1} onPress={onPress}>
            <Text variant="standard" paddingY={1}>
              {item.name}, {item.country.name}
            </Text>
            {/* {cityId === item.id && 'selected'} */}
          </Pressable>

          {index < data.length - 1 && (
            <Divider
              thickness={1}
              marginY={1}
              bgColor={colors.backgroundDividerTransparent}
            />
          )}
        </>
      );
    },
    // [cityId, data, colors, onSelect]
    [data, colors, onSelect]
  );

  if (loading && data.length === 0) {
    return <Loader />;
  }

  return (
    <SafeAreaView>
      <Box padding={15}>
        <InputSection>
          <FlatList
            contentContainerStyle={{ paddingVertical: 8 }}
            keyExtractor={item => `city-section-${item.id}`}
            renderItem={renderCity}
            data={data}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.7}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={loading ? null : <NoResults />}
            ListFooterComponent={loading ? <Loader /> : null}
          />
        </InputSection>
      </Box>
    </SafeAreaView>
  );
};

export default SelectCityComponent;
