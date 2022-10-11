import { Box } from 'native-base';
import React from 'react';
import { Image, View, StyleSheet, ImageSourcePropType } from 'react-native';
import {
  ORIGINAL_SIZE as removeButtonSize,
  RemoveButton,
} from 'views/components/base/RemoveButton';
import { offsetForRectangle, offsetForRounded } from '../helpers';
import { IImagePreviewProps } from '../types';

const ImagePreview: React.FC<IImagePreviewProps> = ({ imageItem, rounded, onRemove }) => {
  return (
    <>
      <View
        style={[
          styles.container,
          !rounded ? styles.containerRectangle : styles.containerRounded,
        ]}
      >
        <RemoveButton onPress={() => onRemove(imageItem.id)} />
      </View>

      <Box height="full" width="full" overflow="hidden" rounded={rounded ? 'full' : 'md'}>
        <Image source={imageItem.image as ImageSourcePropType} style={styles.image} />
      </Box>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 2,
  },

  containerRounded: {
    top: offsetForRounded(removeButtonSize, 100),
    right: offsetForRounded(removeButtonSize, 100),
  },

  containerRectangle: {
    top: offsetForRectangle(removeButtonSize),
    right: offsetForRectangle(removeButtonSize),
  },

  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
});

export default ImagePreview;
