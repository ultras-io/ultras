import React from 'react';
import { VStack, ScrollView, Button, Input, TextArea } from 'native-base';
import I18n from 'i18n/i18n';
import { useKeyboard } from 'utils/hooks/useKeyboard';
import { useTheme } from 'themes';
import KeyValue, { KeyValueGroup, KeyValueInner } from 'views/components/base/KeyValue';
import AttacheImage from 'views/components/compositions/AttacheImage';
import { Text } from 'native-base';
import { ICreateEventComponentProps } from '../types';

const CreateEventComponent: React.FC<ICreateEventComponentProps> = ({
  data,
  setFieldValue,
}) => {
  const { colors } = useTheme();
  const [isKeyboardOpen, keyboardHeight] = useKeyboard();
  const scrollPosition = React.useRef(0);
  const eventNameRef = React.useRef();
  const locationRef = React.useRef();
  const descriptionRef = React.useRef();
  const scrollRef = React.useRef();

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

  // console.log(data);

  return (
    <ScrollView mb={+keyboardHeight} ref={scrollRef}>
      <VStack px={'3'} space={'4'} mb={'10'}>
        <Text variant={'title'}>Create Event</Text>
        <Input
          value={data?.title?.valueOriginal}
          variant={'form'}
          placeholder={I18n.t('events-add-name')}
          placeholderTextColor={colors.textQuaternary}
          onFocus={() => onFocus(eventNameRef)}
          ref={eventNameRef}
          onChange={e => setFieldValue('title', e.nativeEvent.text)}
        />

        <KeyValueGroup description={I18n.t('events-add-dateTimeDescription')}>
          <KeyValueInner name={I18n.t('events-add-date')} value={'Sep 23, Tuesday'} />
          <KeyValueInner name={I18n.t('events-add-time')} value={'22:45'} />
        </KeyValueGroup>

        {data?.isEndDateTime?.valueOriginal ? (
          <KeyValueGroup description={I18n.t('events-add-endDateTimeDescription')}>
            <KeyValueInner
              name={I18n.t('events-add-endDateTime')}
              value={true}
              onChange={value => setFieldValue('isEndDateTime', value)}
            />
            <KeyValueInner
              name={I18n.t('events-add-endDate')}
              value={'Sep 24, Tuesday'}
            />
            <KeyValueInner name={I18n.t('events-add-endTime')} value={'00:45'} />
          </KeyValueGroup>
        ) : (
          <KeyValue
            name={I18n.t('events-add-endDateTime')}
            value={false}
            onChange={value => setFieldValue('isEndDateTime', value)}
          />
        )}

        <KeyValue
          name={I18n.t('events-add-privacy')}
          value={'Public'}
          description={I18n.t('events-add-privacyDescription')}
        />

        <VStack>
          <Input
            variant={'form'}
            placeholder={I18n.t('events-add-location')}
            placeholderTextColor={colors.textQuaternary}
            onFocus={() => onFocus(locationRef)}
            ref={locationRef}
          />
          <Text variant={'cardStats'} p={'2'}>
            {I18n.t('events-add-endDateTimeDescription')}
          </Text>
        </VStack>

        <TextArea
          variant={'form'}
          placeholder={I18n.t('events-add-description')}
          placeholderTextColor={colors.textQuaternary}
          onFocus={() => onFocus(descriptionRef)}
          ref={descriptionRef}
        />

        <AttacheImage title={I18n.t('events-add-photo')} />

        <Button onPress={() => {}} variant={'primary'}>
          {I18n.t('events-add-button')}
        </Button>
      </VStack>
    </ScrollView>
  );
};

export default CreateEventComponent;
