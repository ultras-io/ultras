import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { withTheme } from 'styled-components/native';

import styles from './styles';
import { IWithSafeAreaProps } from './types';

const WithSafeArea: React.FC<IWithSafeAreaProps> = ({
  theme,
  children,
  disableSafeArea = false,
}) => {
  return disableSafeArea ? (
    <View style={[styles.container, { backgroundColor: theme?.colors.bgColor }]}>
      {children}
    </View>
  ) : (
    <SafeAreaView style={[styles.container, { backgroundColor: theme?.colors.bgColor }]}>
      {children}
    </SafeAreaView>
  );
};

export default React.memo<IWithSafeAreaProps>(withTheme(WithSafeArea));
