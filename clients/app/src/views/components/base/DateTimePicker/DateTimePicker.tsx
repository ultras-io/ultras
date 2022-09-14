import React from 'react';
import { StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Box, Text } from 'native-base';
import { IDatePickerProps } from './types';

export const DatePicker: React.FC<IDatePickerProps> = ({ text, value, onChange }) => {
  return (
    <Box style={styles.relative}>
      <Text variant={'matchDate'}>{text}</Text>
      <Box style={styles.hidden}>
        <DateTimePicker
          value={value}
          mode={'date'}
          onChange={onChange}
          minimumDate={new Date()}
          display="compact"
          themeVariant="dark"
        />
      </Box>
    </Box>
  );
};

export const TimePicker: React.FC<IDatePickerProps> = ({ text, value, onChange }) => {
  return (
    <Box style={styles.relative}>
      <Text variant={'matchDate'}>{text}</Text>
      <Box style={styles.hidden}>
        <DateTimePicker
          value={value}
          mode={'time'}
          onChange={onChange}
          minuteInterval={10}
          display="compact"
          themeVariant="dark"
        />
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  relative: { position: 'relative' },
  hidden: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0,
  },
});
