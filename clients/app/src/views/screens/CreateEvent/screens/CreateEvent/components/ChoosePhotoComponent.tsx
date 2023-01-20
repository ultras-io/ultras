import { AwsS3FolderEnum } from '@ultras/utils';
import React from 'react';
import ChooseAndUploadPhoto from 'views/components/base/ChooseAndUploadPhoto';
import { eventsStore } from '../../../store';
import { IChoosePhotoComponentProps } from '../types';

const ChoosePhotoComponent: React.FC<IChoosePhotoComponentProps> = ({
  title,
  onUploadStarted,
  onUploadCompleted,
}) => {
  const { add: storeAdd } = eventsStore.useSelector('add');

  const onChange = React.useCallback(
    (newImages: Array<string>) => {
      let imageUrl = '';
      if (newImages.length > 0) {
        imageUrl = newImages[0];
      }

      if (typeof onUploadCompleted === 'function') {
        onUploadCompleted();
      }

      storeAdd.setFieldValue('image', imageUrl);
    },
    [onUploadCompleted, storeAdd]
  );

  return (
    <ChooseAndUploadPhoto
      folder={AwsS3FolderEnum.event}
      title={title}
      rounded={false}
      multiple={false}
      onChange={onChange}
      onUploadStart={onUploadStarted}
    />
  );
};

export default ChoosePhotoComponent;
