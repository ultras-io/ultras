import React from 'react';
import {Platform, View} from 'react-native';
import {BlurView} from '@react-native-community/blur';

import {IBluredViewProps} from './types';
import styles from './styles';

const BluredView: React.FC<IBluredViewProps> = ({children, style}) => {
  return Platform.OS === 'ios' ? (
    <BlurView blurType="dark" blurAmount={30} style={style}>
      {children}
    </BlurView>
  ) : (
    <View style={[styles.blur, style]}>{children}</View>
  );
};

export default React.memo<IBluredViewProps>(BluredView);
