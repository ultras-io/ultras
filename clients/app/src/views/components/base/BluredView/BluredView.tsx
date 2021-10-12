import React from 'react';
import {BlurView} from '@react-native-community/blur';

import {IBluredViewProps} from './types';

const BluredView: React.FC<IBluredViewProps> = ({children, style}) => {
  return (
    <BlurView blurType="dark" blurAmount={30} style={style}>
      {children}
    </BlurView>
  );
};

export default React.memo<IBluredViewProps>(BluredView);
