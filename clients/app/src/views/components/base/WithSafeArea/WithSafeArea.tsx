import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {withTheme} from 'styled-components/native';

import {IWithSafeAreaProps} from './types';

const WithSafeArea: React.FC<IWithSafeAreaProps> = ({
  theme,
  children,
  disableSafeArea = false,
}) => {
  return disableSafeArea ? (
    <View style={{backgroundColor: theme?.colors.backgroundColor}}>
      {children}
    </View>
  ) : (
    <SafeAreaView style={{backgroundColor: theme?.colors.backgroundColor}}>
      {children}
    </SafeAreaView>
  );
};

export default React.memo<IWithSafeAreaProps>(withTheme(WithSafeArea));
