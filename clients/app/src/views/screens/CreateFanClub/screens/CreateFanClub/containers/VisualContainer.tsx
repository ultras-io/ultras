import React from 'react';
import { Text, VStack } from 'native-base';
import I18n from 'i18n/i18n';
import AttacheImage from 'views/components/compositions/AttacheImage';

const VisualContainer: React.FC = () => {
  return (
    <VStack space={4} paddingX={3}>
      <Text variant="cardInfo">{I18n.t('fanClubs-add-visuals')}</Text>

      <AttacheImage title={I18n.t('fanClubs-add-visuals-avatar')} rounded={true} />

      <AttacheImage title={I18n.t('fanClubs-add-visuals-cover')} />
    </VStack>
  );
};

export default VisualContainer;
