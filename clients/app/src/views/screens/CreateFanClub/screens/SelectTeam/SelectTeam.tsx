import React from 'react';
import { Button } from 'native-base';
import { Icons } from 'assets/icons';
import Icon from 'views/components/base/Icon';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import SelectTeamContainer from './containers/SelectTeamContainer';
import { ISelectTeamProps } from './types';

const SelectTeam: React.FC<ISelectTeamProps> = ({ route }) => {
  const { teamId } = route.params;

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
        <Icon name={Icons.BackNavigation} color="textAction" size="sm" />
      </Button>

      <SelectTeamContainer teamId={teamId} />
    </>
  );
};

export default SelectTeam;
