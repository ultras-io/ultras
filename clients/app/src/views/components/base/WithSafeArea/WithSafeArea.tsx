import React from 'react';
import {SafeAreaView, View} from 'react-native';

import {IWithSafeAreaProps} from './types';
import styles from 'styles/styles';

const WithSafeArea: React.FC<IWithSafeAreaProps> = ({
  children,
  disableSafeArea = false,
}) => {
  return disableSafeArea ? (
    <View>{children}</View>
  ) : (
    <SafeAreaView style={styles.appBackgroundColor}>{children}</SafeAreaView>
  );
};

export default React.memo<IWithSafeAreaProps>(WithSafeArea);
