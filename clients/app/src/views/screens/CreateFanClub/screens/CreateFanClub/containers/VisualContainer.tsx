/* eslint-disable react-hooks/exhaustive-deps */

import { AwsS3FolderEnum } from '@ultras/utils';
import React from 'react';
import { Text, VStack } from 'native-base';
import I18n from 'i18n/i18n';
import ChoosePhotoComponent from '../components/ChoosePhotoComponent';
import { useFileUploadStore } from 'views/screens/CreateFanClub/stores';

const VisualContainer: React.FC = () => {
  const store = useFileUploadStore();

  const onAvatarUploadStarted = React.useCallback(
    () => store.setUploadingAvatar(true),
    []
  );

  const onAvatarUploadCompleted = React.useCallback(
    () => store.setUploadingAvatar(false),
    []
  );

  const onCoverUploadStarted = React.useCallback(() => store.setUploadingCover(true), []);

  const onCoverUploadCompleted = React.useCallback(
    () => store.setUploadingCover(false),
    []
  );

  return (
    <VStack space={3} paddingX={3}>
      <Text variant="cardInfo">{I18n.t('fanClubs-add-visuals')}</Text>

      <ChoosePhotoComponent
        title={I18n.t('fanClubs-add-visuals-avatar')}
        rounded={true}
        field="avatar"
        folder={AwsS3FolderEnum.fanClubAvatar}
        onUploadStarted={onAvatarUploadStarted}
        onUploadCompleted={onAvatarUploadCompleted}
      />

      <ChoosePhotoComponent
        title={I18n.t('fanClubs-add-visuals-cover')}
        rounded={false}
        field="coverPhoto"
        folder={AwsS3FolderEnum.fanClubCover}
        onUploadStarted={onCoverUploadStarted}
        onUploadCompleted={onCoverUploadCompleted}
      />
    </VStack>
  );
};

export default VisualContainer;
