import React from 'react';
import { SafeAreaView } from 'react-native';
import { Box, Divider, Pressable, Text } from 'native-base';
import { useTheme } from 'themes';
import FlatList from 'views/components/base/FlatList/FlatList';
import { Loader } from 'views/components/base/ListComponents';
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
      <Box paddingX={4} paddingTop={4}>
        <InputSection>
          <FlatList
            loading={loading}
            contentContainerStyle={{ paddingVertical: 8 }}
            keyExtractor={item => `city-section-${item.id}`}
            renderItem={renderCity}
            data={data}
            onEndReached={onEndReached}
            horizontal={false}
            showsVerticalScrollIndicator={false}
          />
        </InputSection>
      </Box>
    </SafeAreaView>
  );
};

export default SelectCityComponent;
