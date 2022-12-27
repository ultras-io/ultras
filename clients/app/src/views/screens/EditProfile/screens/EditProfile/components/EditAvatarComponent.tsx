import { AwsS3FolderEnum } from '@ultras/utils';
import React from 'react';
import { Center, Text } from 'native-base';
import I18n from 'i18n/i18n';
import ChooseAndUploadPhoto from 'views/components/base/ChooseAndUploadPhoto';
import * as editProfileStore from 'stores/editProfile';
import { IEditAvatarComponentProps } from './types';

const EditAvatarComponent: React.FC<IEditAvatarComponentProps> = ({ avatar }) => {
  const useStore = editProfileStore.initStore();
  const store = useStore();

  const onChoose = React.useCallback(
    (newImages: Array<string>) => {
      let imageUrl: Nullable<string> = null;
      if (newImages.length > 0) {
        imageUrl = newImages[0];
      }

      store.setFieldValue('avatar', imageUrl);
      store.update('avatar');
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <>
      <ChooseAndUploadPhoto
        folder={AwsS3FolderEnum.profilePicture}
        insideOfInputSection={false}
        centered={true}
        rounded={true}
        size={136}
        multiple={false}
        removable={false}
        initialImages={avatar ? [{ uri: avatar }] : []}
        onChange={onChoose}
      />

      <Center marginTop={2}>
        <Text variant="cardTime">{I18n.t('profile-edit-tapToEdit')}</Text>
      </Center>
    </>
  );
};

export default EditAvatarComponent;
