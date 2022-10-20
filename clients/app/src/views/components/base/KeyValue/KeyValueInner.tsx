import React from 'react';
import { HStack, VStack, Text, Switch } from 'native-base';
import { useTheme } from 'themes';
import KeyValueDropdown from './KeyValueDropdown';
import { IKeyValueProps } from './types';

export const KeyValueInner: React.FC<IKeyValueProps> = ({
  viewMode = 'inline',
  name,
  value,
  options,
  onChange,
}) => {
  const { colors } = useTheme();

  let rightComponent = null;

  // render switch button for boolean values
  if (typeof value === 'boolean') {
    rightComponent = (
      <Switch
        value={value}
        onTrackColor={colors.buttonPrimary}
        onChange={e => {
          onChange && onChange(e.nativeEvent.value);
        }}
      />
    );
  }
  // render simple text or ActionSheet (if dropdown options was provided)
  else if (typeof value === 'string') {
    if (typeof options !== 'undefined') {
      rightComponent = (
        <KeyValueDropdown
          name={name}
          value={value}
          options={options}
          onChange={onChange}
        />
      );
    } else {
      rightComponent = <Text variant={'matchDate'}>{value}</Text>;
    }
  }

  // otherwise render value as child component
  else {
    rightComponent = value;
  }

  const textVariant = React.useMemo(() => {
    return viewMode === 'inline' ? 'messageInvert' : 'cardTime';
  }, [viewMode]);

  const textProps = React.useMemo(() => {
    if (viewMode === 'inline') {
      return {};
    } else {
      return {
        marginBottom: 1,
      };
    }
  }, [viewMode]);

  const GroupComponent = React.useMemo(() => {
    return viewMode === 'inline' ? HStack : VStack;
  }, [viewMode]);

  const groupProps = React.useMemo(() => {
    if (viewMode === 'inline') {
      return {
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingY: '2',
        paddingX: '3',
      };
    } else {
      return {
        alignItems: 'flex-start',
        paddingY: '2',
        paddingX: '3',
      };
    }
  }, [viewMode]);

  return (
    <GroupComponent {...groupProps}>
      <Text variant={textVariant} {...textProps}>
        {name}
      </Text>

      {rightComponent}
    </GroupComponent>
  );
};
