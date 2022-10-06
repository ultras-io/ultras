import React from 'react';
import { Box, Text } from 'native-base';
import I18n from 'i18n/i18n';
import Input from 'views/components/base/Input';
import Icon from 'views/components/base/Icon';
import { Icons } from 'assets/icons';
import { ISearchTeamComponentProps } from '../types';

const SearchTeamComponent: React.FC<ISearchTeamComponentProps> = ({ onChange }) => {
  return (
    <Box paddingBottom="3">
      <Text variant={'title'} mb={'2'} px="5">
        {I18n.t('fanClubs-selectTeam')}
      </Text>

      <Input
        mx={4}
        variant="search"
        placeholder={I18n.t('fanClubs-searchTeam')}
        InputLeftElement={
          <Icon name={Icons.SearchText} color={'textQuinary'} size={'ic-xs'} ml={2} />
        }
        onChange={onChange}
      />
    </Box>
  );
};

export default SearchTeamComponent;
