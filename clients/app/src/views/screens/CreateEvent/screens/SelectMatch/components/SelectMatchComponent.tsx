import React from 'react';
import { Box, FlatList, Pressable } from 'native-base';
import { ISelectMatchComponentProps } from '../types';
import MatchInfo from 'views/components/compositions/MatchInfo';
import { Loader, NoResults } from 'views/components/base/ListComponents';
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
        keyExtractor={item => `match-section-${item.id}`}
        renderItem={renderMatch}
        data={data}
        onEndReached={loading ? undefined : onEndReached}
        onEndReachedThreshold={0.7}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={loading ? null : <NoResults />}
        ListFooterComponent={loading ? <Loader /> : null}
      />
    </Box>
  );
};

export default SelectMatchComponent;
