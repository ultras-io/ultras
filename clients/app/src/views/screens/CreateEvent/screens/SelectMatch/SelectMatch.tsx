import React from 'react';
import { Button } from 'native-base';
import { Icons } from 'assets/icons';
import Icon from 'views/components/base/Icon';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import { ISelectMatchProps } from './types';

const SelectMatchContainer = React.lazy(
  () => import('./containers/SelectMatchContainer')
);

const SelectMatch: React.FC<ISelectMatchProps> = ({ route }) => {
  const { matchId } = route.params;

  const { goBack } = useNavigationWithParams();

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
        <Icon name={Icons.Back} color="textAction" size="sm" />
      </Button>

      <SelectMatchContainer matchId={matchId} />
    </>
  );
};

export default SelectMatch;
