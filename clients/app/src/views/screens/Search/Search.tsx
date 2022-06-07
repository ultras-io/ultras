import React from 'react';
import { Box } from 'native-base';
import I18n from 'i18n/i18n';
import Input from 'views/components/base/Input';
import Icon from 'views/components/base/Icon';
import { IconNamesEnum as Icons } from 'assets/icons';
import SearchTabNavigation from './components/SearchTabNavigation';
import { ISearchProps } from './types';

const Search: React.FC<ISearchProps> = () => {
  const [searchText, setSearchText] = React.useState<string>('');

  return (
    <Box safeAreaTop h={'full'}>
      <Input
        mx={4}
        variant="search"
        placeholder={I18n.t('search')}
        InputLeftElement={
          <Icon name={Icons.SearchText} color={'textQuinary'} size={'ic-xs'} ml={2} />
        }
        onChange={setSearchText}
      />
      <SearchTabNavigation searchText={searchText} />
    </Box>
  );
};

export default Search;
