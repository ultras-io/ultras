import React from 'react';
import { Platform } from 'react-native';
import { BlurView } from '@react-native-community/blur';

import Box from 'views/components/base/Box';

import { IBluredViewProps } from './types';

const BluredView: React.FC<IBluredViewProps> = ({ children, style }) => {
  return Platform.OS === 'ios' ? (
    <BlurView blurType="dark" blurAmount={30} style={style}>
      {children}
    </BlurView>
  ) : (
    <Box bgColor={'androidBlurColor'} style={style}>
      {children}
    </Box>
  );
};

export default React.memo<IBluredViewProps>(BluredView);
