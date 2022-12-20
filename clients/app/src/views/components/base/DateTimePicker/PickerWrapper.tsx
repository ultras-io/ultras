import React from 'react';
import { StyleSheet } from 'react-native';
import { Box, Pressable, Text } from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import { OnChangeInterface, PickerWrapperProps } from './types';

const PickerWrapper: React.FC<PickerWrapperProps> = ({
  autoclose = true,
  text,
  value,
  onChange,
  ...rest
}) => {
  const [opened, setOpened] = React.useState<boolean>(true);

  const onValueChange: OnChangeInterface = React.useCallback(
    (event, date) => {
      if (typeof onChange === 'function') {
        onChange(event, date);
      }

      if (autoclose) {
        setOpened(false);
        setTimeout(() => {
          setOpened(true);
        }, 10);
      }
    },
    [autoclose, onChange]
  );

  const triggerOpen = React.useCallback(() => {
    setOpened(true);
  }, []);

  return (
    <Box style={styles.relative}>
      <Pressable onPress={triggerOpen}>
        <Text variant={'matchDate'}>{text}</Text>
      </Pressable>

      {opened && (
        <Box style={styles.hidden}>
          <DateTimePicker
            {...rest}
            value={value}
            onChange={onValueChange}
            display="compact"
            themeVariant="dark"
          />
        </Box>
      )}
    </Box>
  );
};

export default PickerWrapper;

const styles = StyleSheet.create({
  relative: { position: 'relative' },
  hidden: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0,
  },
});
