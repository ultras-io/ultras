import React from 'react';
import ChooseAndUploadPhoto from 'views/components/base/ChooseAndUploadPhoto';
import { fanClubsStore } from '../../../store';
import { IChoosePhotoComponentProps } from '../types';

const ChoosePhotoComponent: React.FC<IChoosePhotoComponentProps> = ({
  title,
  rounded,
  field,
  folder,
}) => {
  const { add: storeAdd } = fanClubsStore.useSelector('add');

  const onChange = React.useCallback(
    (newImages: Array<string>) => {
      let imageUrl = '';
      if (newImages.length > 0) {
        imageUrl = newImages[0];
      }

      storeAdd.setFieldValue(field, imageUrl);
    },
    [field, storeAdd]
  );

  return (
    <ChooseAndUploadPhoto
      folder={folder}
      title={title}
      rounded={rounded}
      multiple={false}
      onChange={onChange}
    />
  );
};

export default ChoosePhotoComponent;
