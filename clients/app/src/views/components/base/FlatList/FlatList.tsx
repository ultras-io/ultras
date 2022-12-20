import React from 'react';
import { FlatList as NBFlatList } from 'native-base';
import { NoResults, Loader } from 'views/components/base/ListComponents';
import { IFlatList } from './types';

const FlatList: React.FC<IFlatList> = ({
  loading,
  onEndReachedThreshold = 0.7,
  onEndReached,
  ...rest
}) => {
  return (
    <NBFlatList
      {...rest}
      onEndReached={loading ? undefined : onEndReached}
      onEndReachedThreshold={onEndReachedThreshold}
      ListEmptyComponent={loading ? null : <NoResults />}
      ListFooterComponent={loading ? <Loader /> : null}
    />
  );
};

export default FlatList;
