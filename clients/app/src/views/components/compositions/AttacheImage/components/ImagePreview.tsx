import { Box } from 'native-base';
import { SizeType } from 'native-base/lib/typescript/components/types';
import React from 'react';
import { Image, View, StyleSheet, ImageSourcePropType } from 'react-native';
import { useTheme } from 'themes';
import {
  ORIGINAL_SIZE as removeButtonSize,
  RemoveButton,
} from 'views/components/base/RemoveButton';
import { offsetForRectangle, offsetForRounded } from '../helpers';
import { IImagePreviewProps } from '../types';

const ImagePreview: React.FC<IImagePreviewProps> = ({
  imageItem,
  rounded,
  computedSize,
  onRemove,
}) => {
  const { theming } = useTheme();

  const containerStyle = React.useMemo(() => {
    let offset = 0;

    if (!rounded) {
      offset = offsetForRectangle(removeButtonSize);
    } else {
      let size = 0;
      if (typeof computedSize.height === 'number') {
        size = computedSize.height;
      } else {
        if (computedSize.height) {
          size = theming.sizes[computedSize.height];
        }
      }

      offset = offsetForRounded(removeButtonSize, size);
    }

    return {
      right: offset,
      top: offset,
    };
  }, [rounded, computedSize.height, theming.sizes]);

  return (
    <>
      <View style={[styles.container, containerStyle]}>
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

  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
});

export default ImagePreview;