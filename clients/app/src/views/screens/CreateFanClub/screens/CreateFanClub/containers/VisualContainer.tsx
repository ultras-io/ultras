import React from 'react';
import { Text, VStack } from 'native-base';
import I18n from 'i18n/i18n';
import { InputSection } from 'views/components/base/InputSection';

const VisualContainer: React.FC = () => {
  return (
    <VStack space={4} paddingX={3}>
      <Text variant="cardInfo">{I18n.t('fanClubs-add-visuals')}</Text>

      <InputSection padding={3}>
        <Text>{I18n.t('fanClubs-add-visuals-avatar')}</Text>

        {/* @TODO: add avatar component here */}
      </InputSection>

      <InputSection padding={3}>
        <Text>{I18n.t('fanClubs-add-visuals-cover')}</Text>

        {/* @TODO: add cover photo component here */}
      </InputSection>
    </VStack>
  );
};

export default VisualContainer;
