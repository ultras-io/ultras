import React from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import { Pressable, Text } from 'native-base';
import I18n from 'i18n/i18n';
import { ITapToAddProps } from '../types';

const TapToAdd: React.FC<ITapToAddProps> = ({ imageItem, onChoose }) => {
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
      <Text variant={'smallText'} textAlign="center">
        {I18n.t('common-tapToAdd')}
      </Text>
    </Pressable>
  );
};

export default TapToAdd;
