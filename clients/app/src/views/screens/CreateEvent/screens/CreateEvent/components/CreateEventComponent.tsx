import React from 'react';
import { VStack, ScrollView, Button, Input, TextArea, Text } from 'native-base';
import I18n from 'i18n/i18n';
import { useKeyboard } from 'utils/hooks/useKeyboard';
import { useTheme } from 'themes';
import KeyValue from 'views/components/base/KeyValue';
import DateAndTimeRows from './DateAndTimeRows';
import SelectedMatchComponent from './SelectedMatchComponent';
import AttacheImage from 'views/components/compositions/AttacheImage';
import { ICreateEventComponentProps } from '../types';
import { EventPrivacyEnum } from '@ultras/utils';

const CreateEventComponent: React.FC<ICreateEventComponentProps> = ({
  loading,
  data,
  onCreatePress,
  setAddFieldValue,
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
        <Text variant={'title'}>{I18n.t('events-create-title')}</Text>

        <Input
          value={data.title.valueOriginal}
          variant={'form'}
          placeholder={I18n.t('events-add-name')}
          placeholderTextColor={colors.textQuaternary}
          onFocus={() => onFocus(eventNameRef)}
          ref={eventNameRef}
          onChange={e => setAddFieldValue('title', e.nativeEvent.text)}
        />

        <DateAndTimeRows
          dateTime={data.dateTime.valueOriginal}
          dateTitle={I18n.t('events-add-date')}
          timeTitle={I18n.t('events-add-time')}
          onChange={value => setAddFieldValue('dateTime', value)}
          description={I18n.t('events-add-dateTimeDescription')}
        />

        {data.isEndDateTime.valueOriginal ? (
          <DateAndTimeRows
            dateTime={data.endDateTime.valueOriginal}
            dateTitle={I18n.t('events-add-endDate')}
            timeTitle={I18n.t('events-add-endTime')}
            onChange={value => setAddFieldValue('endDateTime', value)}
            description={I18n.t('events-add-endDateTimeDescription')}
            withSwitch
            switchTitle={I18n.t('events-add-endDateTime')}
            switchValue={true}
            onSwitchChange={value => setAddFieldValue('isEndDateTime', value)}
          />
        ) : (
          <KeyValue
            name={I18n.t('events-add-endDateTime')}
            value={false}
            onChange={value => setAddFieldValue('isEndDateTime', value as boolean)}
          />
        )}

        {data.matchId?.valueOriginal && (
          <SelectedMatchComponent
            matchId={data.matchId?.valueOriginal}
            onRemoveMatchPress={() => setAddFieldValue('matchId', null)}
          />
        )}

        <KeyValue
          name={I18n.t('events-add-privacy')}
          value={data.privacy.valueOriginal}
          description={I18n.t('events-add-privacyDescription')}
          options={{
            [EventPrivacyEnum.private]: I18n.t('events-add-privacy-private'),
            [EventPrivacyEnum.public]: I18n.t('events-add-privacy-public'),
          }}
          onChange={value => setAddFieldValue('privacy', value as EventPrivacyEnum)}
        />

        <VStack>
          <Input
            value={data.locationName.valueOriginal}
            variant={'form'}
            placeholder={I18n.t('events-add-location')}
            placeholderTextColor={colors.textQuaternary}
            onFocus={() => onFocus(locationRef)}
            onChange={e => setAddFieldValue('locationName', e.nativeEvent.text)}
            ref={locationRef}
          />
          <Text variant={'cardStats'} p={'2'}>
            {I18n.t('events-add-endDateTimeDescription')}
          </Text>
        </VStack>

        <TextArea
          value={data.content.valueOriginal}
          variant={'form'}
          placeholder={I18n.t('events-add-description')}
          placeholderTextColor={colors.textQuaternary}
          onFocus={() => onFocus(descriptionRef)}
          onChange={e => setAddFieldValue('content', e.nativeEvent.text)}
          ref={descriptionRef}
        />

        <AttacheImage title={I18n.t('events-add-photo')} />

        <Button onPress={onCreatePress} variant={'primary'} isLoading={loading}>
          {I18n.t('events-add-button')}
        </Button>
      </VStack>
    </ScrollView>
  );
};

export default CreateEventComponent;
