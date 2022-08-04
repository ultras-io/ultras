import React from 'react';
import { Keyboard } from 'react-native';

export function useKeyboard() {
  const [isKeyboardOpen, setIsKeyboardOpen] = React.useState(false);
  const [keyboardHeight, setKeyboardHeight] = React.useState(0);

  React.useLayoutEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (frames: any) => {
        setIsKeyboardOpen(true);
        setKeyboardHeight(frames.endCoordinates.height);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardOpen(false);
    });

    const keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', () => {
      setKeyboardHeight(0);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
      keyboardWillHideListener.remove();
    };
  }, []);

  return [isKeyboardOpen, keyboardHeight];
}
