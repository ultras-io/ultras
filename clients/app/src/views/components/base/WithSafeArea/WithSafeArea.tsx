import React from 'react';
import { SafeAreaView, View } from 'react-native';

import styles from './styles';
import { IWithSafeAreaProps } from './types';

const WithSafeArea: React.FC<IWithSafeAreaProps> = ({
  children,
  disableSafeArea = false,
}) => {
  const ViewComponent = disableSafeArea ? View : SafeAreaView;

  return <ViewComponent style={[styles.container]}>{children}</ViewComponent>;
};

export default React.memo<IWithSafeAreaProps>(WithSafeArea);
