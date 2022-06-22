import React from 'react';
import { Button, Text } from 'native-base';
import I18n from 'i18n/i18n';
import { useTheme } from 'themes';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import Input from 'views/components/base/Input';
import Icon from 'views/components/base/Icon';
import { Icons as Icons } from 'assets/icons';
import Container from 'views/components/base/Container';
import { ISearchListModalProps } from './types';

const SearchListContainer = React.lazy(() => import('./containers/SearchListContainer'));

const SearchListModal: React.FC<ISearchListModalProps> = ({ route }) => {
  const { goBack, goBackWithParams } = useNavigationWithParams();
  const { colors } = useTheme();
  const { dataKey, parentScreenName } = route.params;

  const onSelect = React.useCallback(
    ({ id, name, dataType }) => {
      goBackWithParams(parentScreenName, { selected: { id, name, dataType } });
    },
    [goBackWithParams, parentScreenName]
  );

  const [searchText, setSearchText] = React.useState<string>('');

  return (
    <Container withSuspense>
      <Button
        onPress={goBack}
        variant={'empty'}
        alignSelf="flex-start"
        _text={{ color: colors.textAction }}
        mt={'5'}
        mb={'2.5'}
        px={'2.5'}
      >
        {I18n.t('common-close')}
      </Button>

      <Text variant={'title'} mb={'2'} px="5">
        {I18n.t('common-select')} {I18n.t(dataKey === 'team' ? 'team' : 'country')}
      </Text>

      <Input
        mx={4}
        variant="search"
        placeholder={I18n.t('common-search')}
        InputLeftElement={
          <Icon name={Icons.SearchText} color={'textQuinary'} size={'ic-xs'} ml={2} />
        }
        onChange={setSearchText}
      />

      <SearchListContainer
        dataType={dataKey}
        searchText={searchText}
        onSelect={onSelect}
      />
    </Container>
  );
};

export default React.memo<ISearchListModalProps>(SearchListModal);
