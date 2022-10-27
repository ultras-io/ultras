import React from 'react';
import { Box, Input } from 'native-base';
import { useTheme } from 'themes';
import KeyValue from 'views/components/base/KeyValue';
import { IUpdateFieldContainerProps } from '../types';
import * as editProfileStore from 'stores/editProfile';

const UpdateFieldContainer: React.FC<IUpdateFieldContainerProps> = ({ label, name }) => {
  const { colors } = useTheme();

  const useStore = editProfileStore.initStore();
  const store = useStore();

  const restProps = React.useMemo(() => {
    if (name === 'email') {
      return { keyboardType: 'email-address' };
    }
    if (name === 'phone') {
      return { keyboardType: 'phone-pad' };
    }
    return {};
  }, [name]);

  return (
    <Box padding={4}>
      <KeyValue
        viewMode="label"
        name={label}
        value={
          <Input
            backgroundColor={colors.transparent}
            padding={0}
            fontSize="4xl"
            value={store[name].value || ''}
            onChange={e => store.setFieldValue(name, e.nativeEvent.text)}
            returnKeyType="done"
            {...restProps}
          />
        }
      />
    </Box>
  );
};

export default UpdateFieldContainer;
