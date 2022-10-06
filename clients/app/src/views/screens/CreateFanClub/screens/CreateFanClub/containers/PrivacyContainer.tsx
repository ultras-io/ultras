import { FanClubPrivacyEnum } from '@ultras/utils';
import React from 'react';
import { Text, VStack } from 'native-base';
import I18n from 'i18n/i18n';
import { fanClubsStore } from '../../../store';
import KeyValue from 'views/components/base/KeyValue/KeyValue';

const PrivacyContainer: React.FC = () => {
  const { add } = fanClubsStore.useSelector('add');

  return (
    <VStack space={4} paddingX={3}>
      <Text variant="cardInfo">{I18n.t('fanClubs-add-privacy')}</Text>

      <KeyValue
        name={I18n.t('fanClubs-add-privacy')}
        description={I18n.t('fanClubs-add-privacy-description')}
        value={add.data?.privacy.valueOriginal as string}
        onChange={value =>
          fanClubsStore.setAddFieldValue('privacy', value as FanClubPrivacyEnum)
        }
        options={{
          [FanClubPrivacyEnum.private]: I18n.t('fanClubs-add-privacy-private'),
          [FanClubPrivacyEnum.public]: I18n.t('fanClubs-add-privacy-public'),
        }}
      />
    </VStack>
  );
};

export default PrivacyContainer;
