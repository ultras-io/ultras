import React from 'react';
import { Box, Text } from 'native-base';
import I18n from 'i18n/i18n';
import Input from 'views/components/base/Input';
import Icon from 'views/components/base/Icon';
import { Icons } from 'assets/icons';
import { ISearchCityComponentProps } from '../types';

const SearchCityComponent: React.FC<ISearchCityComponentProps> = ({ onChange }) => {
  return (
    <Box paddingBottom="3">
      <Text variant={'title'} mb={'2'} px="5">
        {I18n.t('fanClubs-selectCity')}
      </Text>

      <Input
        mx={4}
        variant="search"
        placeholder={I18n.t('fanClubs-searchCity')}
        InputLeftElement={
          <Icon name={Icons.SearchText} color={'textQuinary'} size={'ic-xs'} ml={2} />
        }
        onChange={onChange}
      />
    </Box>
  );
};

export default SearchCityComponent;
