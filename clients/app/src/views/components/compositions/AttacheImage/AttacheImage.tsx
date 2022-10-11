import { generateToken } from '@ultras/utils';
import React from 'react';
import { Box, Text } from 'native-base';
import { useTheme } from 'themes';
import ImagePreview from './components/ImagePreview';
import { IAttacheImageProps, IImageItem, ImageType } from './types';
import TapToAdd from './components/TapToAdd';

const AttacheImage: React.FC<IAttacheImageProps> = ({
  title,
  rounded = false,
  multiple = false,
}) => {
  const [images, setImages] = React.useState<Array<IImageItem>>([]);
  const { colors } = useTheme();

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
    <Box bg={colors.backgroundInput} p={'4'} rounded={'xl'}>
      <Text variant={'smallText'}>{title}</Text>

      <Box flexDirection="row" flexWrap="wrap" marginTop="2">
        {images.map(imageItem => (
          <Box
            key={imageItem.id}
            backgroundColor={colors.buttonSecondaryDisabled}
            rounded={rounded ? 'full' : 'md'}
            height={rounded ? 100 : '40'}
            width={rounded ? 100 : 'full'}
            margin="1"
            position="relative"
          >
            {imageItem.image ? (
              <ImagePreview imageItem={imageItem} rounded={rounded} onRemove={onRemove} />
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
