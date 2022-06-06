import React from 'react';
import { View } from 'react-native';
import I18n from 'i18n/i18n';

import WithSafeArea from 'views/components/base/WithSafeArea';
import Input from 'views/components/base/Input';
import { WithBg } from 'views/components/base/Bg';

import SearchTabNavigation from './components/SearchTabNavigation';

import { ISearchProps } from './types';
import styles from './styles';

const Search: React.FC<ISearchProps> = () => {
  const [searchText, setSearchText] = React.useState<string>('');

  const onChange = React.useCallback(
    text => {
      setSearchText(text.value);
    },
    [setSearchText]
  );

  return (
    <WithSafeArea>
      <WithBg size={'lg'}>
        <View style={styles.searchRow}>
          <Input name={I18n.t('search')} onChange={onChange} />
        </View>
        <SearchTabNavigation searchText={searchText} />
      </WithBg>
    </WithSafeArea>
  );
};

export default Search;
