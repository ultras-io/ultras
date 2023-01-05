import { generateToken } from '@ultras/utils';
import React from 'react';
import { Box, Text } from 'native-base';
import { useTheme } from 'themes';
import ImagePreview from './components/ImagePreview';
import { IAttachImageProps, IImageItem, ImageType, ISize } from './types';
import TapToAdd from './components/TapToAdd';

const generateImage = (
  image: ImageType | null = null,
  isInitialImage: boolean = false
) => {
  return {
    id: 'id' + Date.now() + generateToken(10),
    image: image,
    isInitial: isInitialImage,
  };
};

const AttachImage: React.FC<IAttachImageProps> = ({
  title,
  insideOfInputSection = true,
  initialImages = [],
  size = null,
  rounded = false,
  centered = false,
  multiple = false,
  removable = true,
  uploadStatuses,
  onChange,
}) => {
  const [images, setImages] = React.useState<Array<IImageItem>>(
    initialImages.map(image => generateImage(image, true))
  );

  React.useEffect(() => {
    if (typeof onChange === 'function') {
      onChange(images);
    }
  }, [onChange, images]);

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

  const triggerOnChange = React.useCallback(
    (callback: (oldImages: Array<IImageItem>) => Array<IImageItem>) => {
      setImages(oldImages => {
        const result = callback(oldImages);
        if (result.length === 0) {
          result.push(generateImage());
        }

        return result;
      });
    },
    []
  );

  const appendEmptyItem = React.useCallback(() => {
    triggerOnChange(oldImages => [...oldImages, generateImage()]);
  }, [triggerOnChange]);

  const onRemove = React.useCallback(
    (id: string) => {
      triggerOnChange(oldImages => oldImages.filter(image => id !== image.id));
    },
    [triggerOnChange]
  );

  const onChoose = React.useCallback(
    (id: string, image: ImageType) => {
      triggerOnChange(oldImages =>
        oldImages.map(imageItem => {
          if (imageItem.id === id) {
            imageItem.image = image;
            imageItem.isInitial = false;
          }

          return imageItem;
        })
      );
    },
    [triggerOnChange]
  );

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
      position="relative"
    >
      {title && <Text variant={'smallText'}>{title}</Text>}

      <Box flexDirection="row" flexWrap="wrap" marginTop="2">
        {images.map((imageItem: IImageItem) => (
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
                uploadStatus={uploadStatuses ? uploadStatuses[imageItem.id] : 'idle'}
                onRemove={onRemove}
                onChoose={onChoose}
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

export default React.memo<IAttachImageProps>(AttachImage);
