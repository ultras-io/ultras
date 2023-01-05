import React from 'react';
import { Pressable } from 'native-base';
import { launchImageLibrary } from 'react-native-image-picker';
import { IPressableAreaProps } from '../types';

const PressableArea: React.FC<IPressableAreaProps> = ({
  imageItem,
  onChoose,
  children,
}) => {
  const onChoosePress = React.useCallback(async () => {
    // we also can use <<launchCamera>> function instead,
    // but need to ask camera permission first.
    const response = await launchImageLibrary({
      presentationStyle: 'fullScreen',
      mediaType: 'photo',
      selectionLimit: 1,
    });

    if (!response.assets) {
      return;
    }

    const chosen = response.assets[0];
    onChoose(imageItem.id, chosen);
  }, [imageItem, onChoose]);

  return (
    <Pressable
      height="full"
      width="full"
      justifyContent="center"
      alignItems="center"
      onPress={onChoosePress}
    >
      {children}
    </Pressable>
  );
};

export default PressableArea;
