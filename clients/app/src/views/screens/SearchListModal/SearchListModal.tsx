import React from 'react';
import { View } from 'react-native';
import I18n from 'i18n/i18n';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import UltrasText from 'views/components/base/UltrasText';
import Input from 'views/components/base/Input';
import Button, {
  AppearanceEnum as ButtonAppearance,
  BoxSizeEnum as ButtonBoxSize,
} from 'views/components/base/Button';
import Box from 'views/components/base/Box';
import SearchListContainer from './containers/SearchListContainer';
import { ISearchListModalProps, dataTypeEnum } from './types';
import styles from './styles';

const SearchListModal: React.FC<ISearchListModalProps> = ({ route }) => {
  const { goBack } = useNavigationWithParams();
  const { dataKey } = route.params;

  const [searchText, setSearchText] = React.useState<string>('');

  const onChange = React.useCallback(
    text => {
      setSearchText(text.value);
    },
    [setSearchText]
  );

  const name = dataKey === dataTypeEnum.Country ? I18n.t('country') : I18n.t('team');

  return (
    <Box bgColor="backgroundMain" style={styles.container}>
      <View style={styles.closeButton}>
        <Button
          appearance={ButtonAppearance.Minimal}
          boxSize={ButtonBoxSize.Contain}
          title={I18n.t('close')}
          color={'buttonSecondary'}
          onPress={goBack}
        />
      </View>
      <UltrasText style={styles.title} color="textPrimary">
        {I18n.t('select')} {name}
      </UltrasText>
      <View style={styles.searchRow}>
        <View style={styles.searchInput}>
          <Input name={I18n.t('searchFor') + ' ' + name} onChange={onChange} />
        </View>
      </View>
      <SearchListContainer dataType={dataKey} searchText={searchText} />
    </Box>
  );
};

export default React.memo<ISearchListModalProps>(SearchListModal);
