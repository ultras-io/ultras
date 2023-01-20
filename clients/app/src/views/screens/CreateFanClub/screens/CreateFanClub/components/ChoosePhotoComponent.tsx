import React from 'react';
import ChooseAndUploadPhoto from 'views/components/base/ChooseAndUploadPhoto';
import { fanClubsStore } from 'views/screens/CreateFanClub/stores';
import { IChoosePhotoComponentProps } from '../types';

const ChoosePhotoComponent: React.FC<IChoosePhotoComponentProps> = ({
  title,
  rounded,
  field,
  folder,
  onUploadStarted,
  onUploadCompleted,
}) => {
  const { add: storeAdd } = fanClubsStore.useSelector('add');

  const onChange = React.useCallback(
    (newImages: Array<string>) => {
      let imageUrl = '';
      if (newImages.length > 0) {
        imageUrl = newImages[0];
      }

      if (typeof onUploadCompleted === 'function') {
        onUploadCompleted();
      }

      storeAdd.setFieldValue(field, imageUrl);
    },
    [field, storeAdd, onUploadCompleted]
  );

  return (
    <ChooseAndUploadPhoto
      folder={folder}
      title={title}
      rounded={rounded}
      multiple={false}
      onChange={onChange}
      onUploadStart={onUploadStarted}
    />
  );
};

export default ChoosePhotoComponent;
