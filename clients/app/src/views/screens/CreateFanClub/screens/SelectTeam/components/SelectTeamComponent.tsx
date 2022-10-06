import React from 'react';
import { SafeAreaView } from 'react-native';
import { Box, FlatList } from 'native-base';
import { Loader, NoResults } from 'views/components/base/ListComponents';
import { ISelectTeamComponentProps } from '../types';
import TeamCard from 'views/components/compositions/TeamCard';

const SelectTeamComponent: React.FC<ISelectTeamComponentProps> = ({
  loading,
  data,
  // teamId,
  onSelect,
  onEndReached,
}) => {
  const renderTeam = React.useCallback(
    ({ item }) => {
      const onPress = () => onSelect(item.id);

      return (
        <TeamCard data={item} onPress={onPress} />
        // {/* {teamId === item.id && 'selected'} */}
      );
    },
    // [teamId, onSelect]
    [onSelect]
  );

  if (loading && data.length === 0) {
    return <Loader />;
  }

  return (
    <SafeAreaView>
      <Box padding={15}>
        <FlatList
          contentContainerStyle={{ paddingVertical: 8 }}
          keyExtractor={item => `city-section-${item.id}`}
          renderItem={renderTeam}
          data={data}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.7}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={loading ? null : <NoResults />}
          ListFooterComponent={loading ? <Loader /> : null}
        />
      </Box>
    </SafeAreaView>
  );
};

export default SelectTeamComponent;
