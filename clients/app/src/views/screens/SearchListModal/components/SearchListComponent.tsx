import React from 'react';
import {View, FlatList} from 'react-native';

import styled from 'styled-components/native';
import I18n from 'i18n/i18n';

import UltrasText from 'views/components/base/UltrasText';
import Input from 'views/components/base/Input';
import Button, {
  AppearanceEnum as ButtonAppearance,
  BoxSizeEnum as ButtonBoxSize,
} from 'views/components/base/Button';

import {ISearchListComponentProps} from '../types';
import styles from './styles';

const StyledView = styled.View<ISearchListComponentProps>`
  background-color: ${({theme}) => {
    return theme.colors.backgroundColor;
  }};
`;

const StyledFlat = styled.View<ISearchListComponentProps>`
  background-color: ${({theme}) => {
    return theme.colors.boxBackgroundColor;
  }};
`;

const StyledRow = styled.View<ISearchListComponentProps>`
  border-color: ${({theme}) => {
    return theme.colors.lightText2;
  }};
`;

const SearchListComponent: React.FC<ISearchListComponentProps> = ({
  name,
  data,
  onClose,
}) => {
  const renderRow = ({item}) => (
    <StyledRow style={styles.row}>
      <UltrasText style={styles.text} color="lightText">
        {item.title}
      </UltrasText>
    </StyledRow>
  );

  return (
    <StyledView style={styles.container}>
      <View style={styles.closeButton}>
        <Button
          appearance={ButtonAppearance.Minimal}
          boxSize={ButtonBoxSize.Contain}
          title={I18n.t('close')}
          onPress={onClose}
        />
      </View>

      <UltrasText style={styles.title} color="lightText">
        {I18n.t('select')} {name}
      </UltrasText>

      <View style={styles.searchRow}>
        <View style={styles.searchInput}>
          <Input name={I18n.t('searchFor') + ' ' + name} />
        </View>
      </View>

      <StyledFlat style={styles.flatList}>
        <FlatList
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={renderRow}
          showsVerticalScrollIndicator={false}
        />
      </StyledFlat>
    </StyledView>
  );
};

export default React.memo<ISearchListComponentProps>(SearchListComponent);
