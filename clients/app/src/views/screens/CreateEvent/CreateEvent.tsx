import React from 'react';
import { VStack, Button, Input, TextArea } from 'native-base';
import { useTheme } from 'themes';
import I18n from 'i18n/i18n';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import { Text } from 'native-base';

const CreateEvent: React.FC = () => {
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
      <VStack px={'3'} space={'4'}>
        <Text variant={'title'}>Create Event</Text>

        <Input
          variant={'form'}
          placeholder={I18n.t('events-add-name')}
          placeholderTextColor={colors.textQuaternary}
        />

        <Input
          variant={'form'}
          placeholder={I18n.t('events-add-location')}
          placeholderTextColor={colors.textQuaternary}
        />

        <TextArea
          variant={'form'}
          placeholder={I18n.t('events-add-description')}
          placeholderTextColor={colors.textQuaternary}
        />
      </VStack>
    </>
  );
};

export default CreateEvent;
