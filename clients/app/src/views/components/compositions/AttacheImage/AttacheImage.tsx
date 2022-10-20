import { generateToken } from '@ultras/utils';
import React from 'react';
import { Box, Text } from 'native-base';
import { useTheme } from 'themes';
import ImagePreview from './components/ImagePreview';
import { IAttacheImageProps, IImageItem, ImageType, ISize } from './types';
import TapToAdd from './components/TapToAdd';

const AttacheImage: React.FC<IAttacheImageProps> = ({
  title,
  insideOfInputSection = true,
  initialImages = [],
  size = null,
  rounded = false,
  centered = false,
  multiple = false,
  removable = true,
}) => {
  const [images, setImages] = React.useState<Array<IImageItem>>(
    initialImages.map((image: ImageType) => ({
      id: 'id' + generateToken(10),
      image: image,
    }))
  );

  const { colors } = useTheme();

  const computedSize = React.useMemo((): ISize => {
    if (rounded) {
      return {
        height: size || 100,
        width: size || 100,
      };
    }

    return {
      width: size ? 100 : 'full',
      height: size || 40,
    };
  }, [size, rounded]);

  const appendEmptyItem = React.useCallback(() => {
    const emptyItem: IImageItem = {
      id: 'id' + generateToken(10),
      image: null,
    };

    setImages(oldImages => [...oldImages, emptyItem]);
  }, []);

  const onRemove = React.useCallback((id: string) => {
    setImages(oldImages => oldImages.filter(image => id !== image.id));
  }, []);

  const onChoose = React.useCallback((id: string, image: ImageType) => {
    setImages(oldImages =>
      oldImages.map(imageItem => {
        if (imageItem.id === id) {
          imageItem.image = image;
        }

        return imageItem;
      })
    );
  }, []);

  React.useEffect(() => {
    if (images.length === 0) {
      return appendEmptyItem();
    }

    if (!multiple) {
      return;
    }

    const lastOne = images[images.length - 1];
    if (lastOne.image) {
      appendEmptyItem();
    }
  }, [appendEmptyItem, images, multiple]);

  return (
    <Box
      backgroundColor={insideOfInputSection ? colors.backgroundInput : colors.transparent}
      padding={insideOfInputSection ? 4 : 0}
      rounded={insideOfInputSection ? 'xl' : 0}
      alignItems={centered ? 'center' : 'flex-start'}
    >
      {title && <Text variant={'smallText'}>{title}</Text>}

      <Box flexDirection="row" flexWrap="wrap" marginTop="2">
        {images.map(imageItem => (
          <Box
            key={imageItem.id}
            backgroundColor={colors.buttonSecondaryDisabled}
            rounded={rounded ? 'full' : 'md'}
            height={computedSize.height}
            width={computedSize.width}
            margin={multiple ? 1 : 0}
            position="relative"
          >
            {imageItem.image ? (
              <ImagePreview
                computedSize={computedSize}
                imageItem={imageItem}
                rounded={rounded}
                removable={removable}
                onRemove={onRemove}
              />
            ) : (
              <TapToAdd imageItem={imageItem} onChoose={onChoose} />
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default React.memo<IAttacheImageProps>(AttacheImage);
