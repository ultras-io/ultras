import React from 'react';
import moment from 'moment';
import { KeyValueInner, KeyValueGroup } from 'views/components/base/KeyValue';
import { DatePicker, TimePicker } from 'views/components/base/DateTimePicker';
import { IDateAndTimeRowsProps } from '../types';

const DateAndTimeRows: React.FC<IDateAndTimeRowsProps> = ({
  dateTime,
  dateTitle,
  timeTitle,
  onChange,
  description,
  withSwitch = false,
  switchTitle,
  switchValue,
  onSwitchChange,
}) => {
  const [dateText, dateValue, timeText, timeValue] = React.useMemo(() => {
    const dValue = dateTime;
    const dText = moment(dValue).format('MMM D, dddd');
    const tText = moment(dValue).format('HH:mm');

    return [dText, dValue, tText, dValue];
  }, [dateTime]);

  const onChangeDate = React.useCallback(
    (e, date) => {
      onChange(new Date(date.setHours(dateTime.getHours(), dateTime.getMinutes(), 0, 0)));
    },
    [dateTime, onChange]
  );

  const onChangeTime = React.useCallback(
    (e, date) => {
      onChange(new Date(dateTime.setHours(date.getHours(), date.getMinutes(), 0, 0)));
    },
    [dateTime, onChange]
  );

  return (
    <KeyValueGroup description={description}>
      {withSwitch && (
        <KeyValueInner
          name={switchTitle || ''}
          value={switchValue}
          onChange={onSwitchChange}
        />
      )}
      <KeyValueInner
        name={dateTitle}
        value={<DatePicker text={dateText} value={dateValue} onChange={onChangeDate} />}
      />
      <KeyValueInner
        name={timeTitle}
        value={<TimePicker text={timeText} value={timeValue} onChange={onChangeTime} />}
      />
    </KeyValueGroup>
  );
};

export default DateAndTimeRows;
