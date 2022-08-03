import React from 'react';
import { VStack, ScrollView, Button, Input, TextArea } from 'native-base';
import { useTheme } from 'themes';
import I18n from 'i18n/i18n';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import { useKeyboard } from 'utils/hooks/useKeyboard';
import KeyValue, { KeyValueGroup, KeyValueInner } from 'views/components/base/KeyValue';
import { Text } from 'native-base';

const CreateEvent: React.FC = () => {
  const { colors } = useTheme();
  const { goBack } = useNavigationWithParams();
  const [isKeyboardOpen, keyboardHeight] = useKeyboard();
  const scrollPosition = React.useRef(0);
  const scrollRef = React.useRef();
  const eventNameRef = React.useRef();
  const locationRef = React.useRef();
  const descriptionRef = React.useRef();

  const onFocus = React.useCallback(ref => {
    ref.current?.measureLayout(scrollRef.current, (left, top: number) => {
      scrollPosition.current = top;
    });
  }, []);

  React.useLayoutEffect(() => {
    if (isKeyboardOpen && keyboardHeight !== 0) {
      setTimeout(() => {
        scrollRef.current?.scrollTo({
          y: scrollPosition.current - +keyboardHeight,
          animated: true,
        });
      });
    }
  }, [isKeyboardOpen, keyboardHeight]);

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
      <ScrollView mb={+keyboardHeight} ref={scrollRef}>
        <VStack px={'3'} space={'4'} mb={'4'}>
          <Text variant={'title'}>Create Event</Text>
          <Input
            variant={'form'}
            placeholder={I18n.t('events-add-name')}
            placeholderTextColor={colors.textQuaternary}
            onFocus={() => onFocus(eventNameRef)}
            ref={eventNameRef}
          />

          <KeyValueGroup description={'All Dates and Times are local.'}>
            <KeyValueInner name={I18n.t('events-add-date')} value={'Sep 23, Tuesday'} />
            <KeyValueInner name={I18n.t('events-add-time')} value={'22:45'} />
          </KeyValueGroup>

          <KeyValueGroup>
            <KeyValueInner name={I18n.t('events-add-endDateTime')} value={false} />
            <KeyValueInner
              name={I18n.t('events-add-endDate')}
              value={'Sep 24, Tuesday'}
            />
            <KeyValueInner name={I18n.t('events-add-endTime')} value={'00:45'} />
          </KeyValueGroup>

          <KeyValue
            name={I18n.t('events-add-privacy')}
            value={'Public'}
            description={'All Dates and Times are local.'}
          />

          <Input
            variant={'form'}
            placeholder={I18n.t('events-add-location')}
            placeholderTextColor={colors.textQuaternary}
            onFocus={() => onFocus(locationRef)}
            ref={locationRef}
          />
          <TextArea
            variant={'form'}
            placeholder={I18n.t('events-add-description')}
            placeholderTextColor={colors.textQuaternary}
            onFocus={() => onFocus(descriptionRef)}
            ref={descriptionRef}
          />
        </VStack>
      </ScrollView>
    </>
  );
};

export default CreateEvent;
