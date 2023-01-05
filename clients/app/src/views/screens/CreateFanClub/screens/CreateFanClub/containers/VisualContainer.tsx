import { AwsS3FolderEnum } from '@ultras/utils';
import React from 'react';
import { Text, VStack } from 'native-base';
import I18n from 'i18n/i18n';
import ChoosePhotoComponent from '../components/ChoosePhotoComponent';

const VisualContainer: React.FC = () => {
  return (
    <VStack space={3} paddingX={3}>
      <Text variant="cardInfo">{I18n.t('fanClubs-add-visuals')}</Text>

      <ChoosePhotoComponent
        title={I18n.t('fanClubs-add-visuals-avatar')}
        rounded={true}
        field="avatar"
        folder={AwsS3FolderEnum.fanClubAvatar}
      />

      <ChoosePhotoComponent
        title={I18n.t('fanClubs-add-visuals-cover')}
        rounded={false}
        field="coverPhoto"
        folder={AwsS3FolderEnum.fanClubCover}
      />
    </VStack>
  );
};

export default VisualContainer;
