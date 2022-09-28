import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Box, FlatList, Pressable } from 'native-base';
import { ISelectMatchComponentProps } from '../types';
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
      return (
        <Pressable marginBottom={3} onPress={() => onSelect(item.id)}>
          <InputSection>
            <MatchInfo data={item} pressable={false} />
          </InputSection>

          {/* {matchId === item.id && 'selected'} */}
        </Pressable>
      );
    },
    // [matchId, onSelect]
    [onSelect]
  );

  return (
    <FlatList
      contentContainerStyle={{ padding: 15 }}
      keyExtractor={item => `match-section-${item.id}`}
      renderItem={renderMatch}
      data={data}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.7}
      horizontal={false}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={
        !loading ? null : (
          <Box alignItems="center" paddingTop="4" paddingBottom="10">
            <ActivityIndicator />
          </Box>
        )
      }
    />
  );
};

export default SelectMatchComponent;
