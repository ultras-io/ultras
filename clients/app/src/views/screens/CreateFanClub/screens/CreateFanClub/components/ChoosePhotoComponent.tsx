import React from 'react';
import AttachImage, { IImageItem } from 'views/components/compositions/AttachImage';
import { buildUltrasS3SDK } from 'stores/sdkBuilder';
import { fileToBlob } from 'utils/helpers/fileToBlob';
import { fanClubsStore } from '../../../store';
import { IChoosePhotoComponentProps } from '../types';

const sdk = buildUltrasS3SDK();

const ChoosePhotoComponent: React.FC<IChoosePhotoComponentProps> = ({
  title,
  rounded,
  field,
  folder,
}) => {
  const { add: storeAdd } = fanClubsStore.useSelector('add');
  const [uploading, setUploading] = React.useState<boolean>(false);

  const updateImage = React.useCallback(
    async (newImage: string | null) => {
      // @TODO: remove old image from storage.
      storeAdd.setFieldValue(field, newImage || '');
    },
    [field, storeAdd]
  );

  const onChoose = React.useCallback(
    async (images: Array<IImageItem>) => {
      if (images.length !== 1) {
        return updateImage(null);
      }

      const { image } = images[0];
      if (!image || !image.uri) {
        return updateImage(null);
      }

      setUploading(true);
      const imageBlob = await fileToBlob(image.uri);
      const result = await sdk.upload({
        folder: folder,
        file: imageBlob,
        fileName: image.fileName!,
      });
      setUploading(false);

      if (!result) {
        return updateImage(null);
      }

      updateImage(result.path);
    },
    [folder, updateImage]
  );

  return (
    <AttachImage
      title={title}
      rounded={rounded}
      multiple={false}
      uploading={uploading}
      onChange={onChoose}
    />
  );
};

export default ChoosePhotoComponent;
