import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { useTheme } from 'themes';

import Box from 'views/components/base/Box';

import { IBluredViewProps } from './types';

const BluredView: React.FC<IBluredViewProps> = ({ children, style }) => {
  const { isDarkMode } = useTheme();

  if (Platform.OS === 'android') {
    return (
      <Box bgColor="androidBlurColor" style={style}>
        {children}
      </Box>
    );
  }

  if (!isDarkMode) {
    return (
      <Box bgColor="white" style={[style, styles.whiteShadowed]}>
        {children}
      </Box>
    );
  }

  return (
    <BlurView blurType={isDarkMode ? 'dark' : 'light'} blurAmount={30} style={style}>
      {children}
    </BlurView>
  );
};

const styles = StyleSheet.create({
  whiteShadowed: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.15,
    shadowRadius: 7,

    elevation: 4,
  },
});

export default React.memo<IBluredViewProps>(BluredView);
