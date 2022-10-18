import React from 'react';
import { ScrollView, Button, Text } from 'native-base';
import { useTheme } from 'themes';
import I18n from 'i18n/i18n';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import { IFanClubAboutProps } from './types';

const FanClubAbout: React.FC<IFanClubAboutProps> = ({ route }) => {
  const { description } = route.params;
  const { colors } = useTheme();
  const { goBack } = useNavigationWithParams();

  return (
    <>
      <Button
        onPress={goBack}
        variant={'empty'}
        alignSelf="flex-start"
        _text={{ color: colors.textAction }}
        mt={'5'}
        mb={'2.5'}
        px={'2.5'}
      >
        {I18n.t('common-close')}
      </Button>

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
