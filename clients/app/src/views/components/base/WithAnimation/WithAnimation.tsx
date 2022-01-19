import React, { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

import { IWithAnimationProps, DirectionENum } from './types';

const WithAnimation: React.FC<IWithAnimationProps> = ({
  children,
  direction = DirectionENum.Down2Up,
  duration = 300,
  delay = 0,
}) => {
  let x = 0;
  let y = 0;
  if (direction === DirectionENum.Left2Right) x = -1000;
  else if (direction === DirectionENum.Right2Left) x = 1000;
  else if (direction === DirectionENum.Up2Down) y = -1000;
  else if (direction === DirectionENum.Down2Up) y = 300;
  else if (direction === DirectionENum.Down2UpRight) {
    y = 200;
    x = -200;
  } else if (direction === DirectionENum.Down2UpLeft) {
    y = 200;
    x = 200;
  }

  const pan = useRef(new Animated.ValueXY({ x, y })).current;

  useEffect(() => {
    Animated.timing(pan, {
      toValue: { x: 0, y: 0 },
      duration,
      delay,
      useNativeDriver: true,
    }).start();
  }, [pan, duration, delay]);

  return (
    <Animated.View
      style={{
        transform: [{ translateX: pan.x }, { translateY: pan.y }],
      }}
    >
      {children}
    </Animated.View>
  );
};

export default React.memo<IWithAnimationProps>(WithAnimation);
