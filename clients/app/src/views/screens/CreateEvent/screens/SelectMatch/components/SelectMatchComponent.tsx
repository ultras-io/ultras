import React from 'react';
import { FlatList, Pressable } from 'native-base';
import { ISelectMatchComponentProps } from '../types';
import MatchInfo from 'views/components/compositions/MatchInfo';
import { InputSection } from 'views/components/base/InputSection';

const SelectMatchComponent: React.FC<ISelectMatchComponentProps> = ({
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
    />
  );
};

export default SelectMatchComponent;
