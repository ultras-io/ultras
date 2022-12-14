import React from 'react';
import { Box, Pressable } from 'native-base';
import { ISelectMatchComponentProps } from '../types';
import FlatList from 'views/components/base/FlatList/FlatList';
import MatchInfo from 'views/components/compositions/MatchInfo';
import { InputSection } from 'views/components/base/InputSection';

const SelectMatchComponent: React.FC<ISelectMatchComponentProps> = ({
  loading,
  data,
  // matchId,
  onSelect,
  onEndReached,
}) => {
  const renderMatch = React.useCallback(
    ({ item }) => {
      const onPress = () => onSelect(item.id);

      return (
        <Pressable marginBottom={3} onPress={onPress}>
          <InputSection>
            <MatchInfo data={item} pressable={false} onPress={onPress} />
          </InputSection>

          {/* {matchId === item.id && 'selected'} */}
        </Pressable>
      );
    },
    // [matchId, onSelect]
    [onSelect]
  );

  return (
    <Box paddingX={4} paddingTop={4} flex={1}>
      <FlatList
        loading={loading}
        keyExtractor={item => `match-section-${item.id}`}
        renderItem={renderMatch}
        data={data}
        onEndReached={onEndReached}
        horizontal={false}
        showsVerticalScrollIndicator={false}
      />
    </Box>
  );
};

export default SelectMatchComponent;
