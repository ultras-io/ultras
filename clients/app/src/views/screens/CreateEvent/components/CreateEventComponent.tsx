import React from 'react';
import { VStack, ScrollView, Button, Input, TextArea, Text } from 'native-base';
import I18n from 'i18n/i18n';
import { useKeyboard } from 'utils/hooks/useKeyboard';
import { useTheme } from 'themes';
import KeyValue from 'views/components/base/KeyValue';
import DateAndTimeRows from './DateAndTimeRows';
import AttacheImage from 'views/components/compositions/AttacheImage';
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

  return (
    <ScrollView mb={+keyboardHeight} ref={scrollRef}>
      <VStack px={'3'} space={'4'} mb={'10'}>
        <Text variant={'title'}>Create Event</Text>

        <Input
          value={data.title.valueOriginal}
          variant={'form'}
          placeholder={I18n.t('events-add-name')}
          placeholderTextColor={colors.textQuaternary}
          onFocus={() => onFocus(eventNameRef)}
          ref={eventNameRef}
          onChange={e => setFieldValue('title', e.nativeEvent.text)}
        />

        <DateAndTimeRows
          dateTime={data.dateTime.valueOriginal}
          dateTitle={I18n.t('events-add-date')}
          timeTitle={I18n.t('events-add-time')}
          onChange={value => setFieldValue('dateTime', value)}
          description={I18n.t('events-add-dateTimeDescription')}
        />

        {data.isEndDateTime.valueOriginal ? (
          <DateAndTimeRows
            dateTime={data.endDateTime.valueOriginal}
            dateTitle={I18n.t('events-add-endDate')}
            timeTitle={I18n.t('events-add-endTime')}
            onChange={value => setFieldValue('endDateTime', value)}
            description={I18n.t('events-add-endDateTimeDescription')}
            withSwitch
            switchTitle={I18n.t('events-add-endDateTime')}
            switchValue={true}
            onSwitchChange={value => setFieldValue('isEndDateTime', value)}
          />
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
            value={data.title.locationName}
            variant={'form'}
            placeholder={I18n.t('events-add-location')}
            placeholderTextColor={colors.textQuaternary}
            onFocus={() => onFocus(locationRef)}
            onChange={e => setFieldValue('locationName', e.nativeEvent.text)}
            ref={locationRef}
          />
          <Text variant={'cardStats'} p={'2'}>
            {I18n.t('events-add-endDateTimeDescription')}
          </Text>
        </VStack>

        <TextArea
          value={data.title.content}
          variant={'form'}
          placeholder={I18n.t('events-add-description')}
          placeholderTextColor={colors.textQuaternary}
          onFocus={() => onFocus(descriptionRef)}
          onChange={e => setFieldValue('content', e.nativeEvent.text)}
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