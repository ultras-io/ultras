import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { useTheme } from 'themes';

import styles from './styles';
import { IWithSafeAreaProps } from './types';

const WithSafeArea: React.FC<IWithSafeAreaProps> = ({
  children,
  disableSafeArea = false,
}) => {
  const { colors } = useTheme();

  const ViewComponent = disableSafeArea ? View : SafeAreaView;

  return (
    <ViewComponent
      style={[
        styles.container,
        {
          backgroundColor: colors.screenBackground,
        },
      ]}
    >
      {children}
    </ViewComponent>
  );
};

export default React.memo<IWithSafeAreaProps>(WithSafeArea);
