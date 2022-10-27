import React from 'react';
import { Text, Pressable } from 'native-base';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import { usersStore } from '../../../store';
import { editProfileScreens } from 'views/navigation/screens';
import { KeyValueInner } from 'views/components/base/KeyValue';
import { IPersonalInfoInputComponentProps } from './types';

const PersonalInfoInputComponent: React.FC<IPersonalInfoInputComponentProps> = ({
  label,
  name,
}) => {
  const { pushTo } = useNavigationWithParams();

  const { single: storeSingle } = usersStore.useSelector('single');

  const onPress = React.useCallback(() => {
    pushTo(editProfileScreens.updateField.name, { label, name });
  }, [label, name, pushTo]);

  return (
    <Pressable onPress={onPress}>
      <KeyValueInner
        viewMode="label"
        name={label}
        value={
          <Text width="full" paddingY={1} fontSize="4xl">
            {storeSingle.data![name] || ''}
          </Text>
        }
      />
    </Pressable>
  );
};

export default PersonalInfoInputComponent;
