import React from 'react';
import { ScrollView, Text } from 'native-base';
import I18n from 'i18n/i18n';
import { IFanClubAboutProps } from './types';
import BackButton from 'views/components/base/BackButton';

const FanClubAbout: React.FC<IFanClubAboutProps> = ({ route }) => {
  const { description } = route.params;

  return (
    <>
      <BackButton type="text" action="close" />

      <ScrollView px={'5'}>
        <Text variant={'title'} mb={'2'}>
          {I18n.t('common-about')}
        </Text>
        <Text variant={'standard'} mb={'10'}>
          {description}
        </Text>
      </ScrollView>
    </>
  );
};

export default FanClubAbout;
