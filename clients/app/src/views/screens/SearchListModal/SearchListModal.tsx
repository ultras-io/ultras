import React from 'react';
import { View } from 'react-native';
import { Button } from 'native-base';
import { useTheme } from 'themes';
import I18n from 'i18n/i18n';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import UltrasText from 'views/components/base/UltrasText';
import Input from 'views/components/base/Input';
import Icon from 'views/components/base/Icon';
import { IconNamesEnum as Icons } from 'assets/icons';
import Box from 'views/components/base/Box';
import SearchListContainer from './containers/SearchListContainer';
import { ISearchListModalProps, dataTypeEnum } from './types';
import styles from './styles';

const SearchListModal: React.FC<ISearchListModalProps> = ({ route }) => {
  const { goBack } = useNavigationWithParams();
  const { colors } = useTheme();
  const { dataKey } = route.params;

  const [searchText, setSearchText] = React.useState<string>('');

  const name = dataKey === dataTypeEnum.Country ? I18n.t('country') : I18n.t('team');

  return (
    <Box bgColor="backgroundMain" style={styles.container}>
      <View style={styles.closeButton}>
        <Button
          onPress={goBack}
          variant={'empty'}
          alignSelf="flex-start"
          _text={{ color: colors.textAction }}
        >
          {I18n.t('close')}
        </Button>
      </View>
      <UltrasText style={styles.title} color="textPrimary">
        {I18n.t('select')} {name}
      </UltrasText>
      <View style={styles.searchRow}>
        <View style={styles.searchInput}>
          <Input
            variant="search"
            placeholder={I18n.t('searchFor')}
            InputLeftElement={
              <Icon name={Icons.SearchText} color={'textQuinary'} size={'ic-xs'} ml={2} />
            }
            onChange={setSearchText}
          />
        </View>
      </View>
      <SearchListContainer dataType={dataKey} searchText={searchText} />
    </Box>
  );
};

export default React.memo<ISearchListModalProps>(SearchListModal);
