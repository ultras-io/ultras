import React from 'react';
import { Button } from 'native-base';
import { Icons } from 'assets/icons';
import Icon from 'views/components/base/Icon';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import UpdateFieldContainer from './containers/UpdateFieldContainer';
import { IUpdateFieldProps } from './types';

const UpdateField: React.FC<IUpdateFieldProps> = ({ route }) => {
  const { goBack } = useNavigationWithParams();

  const { label, name } = route.params;

  return (
    <>
      <Button
        variant={'empty'}
        alignSelf={'flex-start'}
        marginTop={'5'}
        marginBottom={'2.5'}
        paddingX={'2.5'}
        onPress={goBack}
      >
        <Icon name={Icons.BackNavigation} color="textAction" size="sm" />
      </Button>

      <UpdateFieldContainer label={label} name={name} />
    </>
  );
};

export default UpdateField;
