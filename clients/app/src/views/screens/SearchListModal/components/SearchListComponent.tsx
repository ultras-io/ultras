import React from 'react';
import {View, FlatList} from 'react-native';

import I18n from 'i18n/i18n';

import Box from 'views/components/base/Box';
import UltrasText from 'views/components/base/UltrasText';
import Input from 'views/components/base/Input';
import Button, {
  AppearanceEnum as ButtonAppearance,
  BoxSizeEnum as ButtonBoxSize,
} from 'views/components/base/Button';

import {ISearchListComponentProps} from '../types';
import styles from './styles';

const SearchListComponent: React.FC<ISearchListComponentProps> = ({
  name,
  data,
  onClose,
}) => {
  const renderRow = ({item}) => (
    <Box
      bgColor={'opacityBgColor'}
      style={[
        styles.row,
        item === data[0] && styles.firstRow,
        item === data[data.length - 1] && styles.lastRow,
      ]}>
      <Box
        borderColor={'opacityBgColor'}
        style={[
          styles.borderedRow,
          item === data[data.length - 1] && styles.lastBorderedRow,
        ]}>
        <UltrasText style={styles.text} color="text">
          {item.title}
        </UltrasText>
      </Box>
    </Box>
  );

  return (
    <Box bgColor={'bgColor'} style={styles.container}>
      <View style={styles.closeButton}>
        <Button
          appearance={ButtonAppearance.Minimal}
          boxSize={ButtonBoxSize.Contain}
          title={I18n.t('close')}
          onPress={onClose}
        />
      </View>

      <FlatList
        ListHeaderComponent={
          <>
            <UltrasText style={styles.title} color="text">
              {I18n.t('select')} {name}
            </UltrasText>
            <View style={styles.searchRow}>
              <View style={styles.searchInput}>
                <Input name={I18n.t('searchFor') + ' ' + name} />
              </View>
            </View>
          </>
        }
        ListFooterComponent={
          <UltrasText color="secondaryText" style={styles.footerText}>
            {I18n.t('canChangeClub')}
          </UltrasText>
        }
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={renderRow}
        showsVerticalScrollIndicator={false}
      />
    </Box>
  );
};

export default React.memo<ISearchListComponentProps>(SearchListComponent);
