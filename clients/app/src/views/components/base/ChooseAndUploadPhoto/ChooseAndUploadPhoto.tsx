import React from 'react';
import AttachImage, {
  IImageItem,
  UploadStatusType,
} from 'views/components/compositions/AttachImage';
import { buildUltrasS3SDK } from 'stores/sdkBuilder';
import { fileToBlob } from 'utils/helpers/fileToBlob';
import { IChooseAndUploadPhotoProps } from './types';

const sdk = buildUltrasS3SDK();

const ChooseAndUploadPhoto: React.FC<IChooseAndUploadPhotoProps> = ({
  folder,
  onChange,
  ...rest
}) => {
  const [uploadStatuses, setUploadStatuses] = React.useState<
    Record<string, UploadStatusType>
  >({});

  const onImageListUpdate = React.useCallback(
    async (newImages: Array<string>, oldImages: Array<string>) => {
      // @TODO: remove old images from storage.
      onChange(newImages, oldImages);
    },
    [onChange]
  );

  const uploadImage = React.useCallback(
    async (chosenImage: IImageItem) => {
      if (!chosenImage.image || !chosenImage.image.uri) {
        return;
      }

      setUploadStatuses(oldUploadStatuses => ({
        ...oldUploadStatuses,
        [chosenImage.id]: 'uploading',
      }));

      const imageBlob = await fileToBlob(chosenImage.image.uri);
      const result = await sdk.upload({
        folder: folder,
        file: imageBlob,
        fileName: chosenImage.image.fileName!,
      });

      setUploadStatuses(oldUploadStatuses => ({
        ...oldUploadStatuses,
        [chosenImage.id]: !result ? 'error' : 'success',
      }));

      return result?.path;
    },
    [folder]
  );

  const onChoose = React.useCallback(
    async (images: Array<IImageItem>) => {
      if (images.length === 0) {
        return onImageListUpdate([], []);
      }

      const promises = [];
      for (const imageItem of images) {
        const promise = uploadImage(imageItem);
        promises.push(promise);
      }

      const imageKeys = await Promise.all(promises);
      return onImageListUpdate(imageKeys, []);
    },
    [onImageListUpdate, uploadImage]
  );

  return <AttachImage {...rest} uploadStatuses={uploadStatuses} onChange={onChoose} />;
};

export default ChooseAndUploadPhoto;
