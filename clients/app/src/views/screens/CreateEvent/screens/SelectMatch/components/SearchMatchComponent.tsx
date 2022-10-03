import React from 'react';
import { Box, Text } from 'native-base';
import I18n from 'i18n/i18n';
import Input from 'views/components/base/Input';
import Icon from 'views/components/base/Icon';
import { Icons } from 'assets/icons';
import { ISearchMatchComponentProps } from '../types';

const SearchMatchComponent: React.FC<ISearchMatchComponentProps> = ({ onChange }) => {
  return (
    <Box paddingBottom="3">
      <Text variant={'title'} mb={'2'} px="5">
        {I18n.t('events-selectMatch')}
      </Text>

      <Input
        mx={4}
        variant="search"
        placeholder={I18n.t('events-searchMatch')}
        InputLeftElement={
          <Icon name={Icons.SearchText} color={'textQuinary'} size={'ic-xs'} ml={2} />
        }
        onChange={onChange}
      />
    </Box>
  );
};

export default SearchMatchComponent;
