import React from 'react';
import { Center, Text } from 'native-base';
import I18n from 'i18n/i18n';
import AttachImage from 'views/components/compositions/AttachImage';
import { IEditAvatarComponentProps } from './types';

const EditAvatarComponent: React.FC<IEditAvatarComponentProps> = ({
  avatar,
  onChange,
}) => {
  return (
    <>
      <AttachImage
        insideOfInputSection={false}
        centered={true}
        rounded={true}
        size={136}
        multiple={false}
        removable={false}
        initialImages={avatar ? [{ uri: avatar }] : []}
      />

      <Center marginTop={2}>
        <Text variant="cardTime">{I18n.t('profile-edit-tapToEdit')}</Text>
      </Center>
    </>
  );
};

export default EditAvatarComponent;
