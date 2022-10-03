import React from 'react';
import { Button } from 'native-base';
import { useTheme } from 'themes';
import I18n from 'i18n/i18n';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import { ISelectMatchProps } from './types';

const SelectMatchContainer = React.lazy(
  () => import('./containers/SelectMatchContainer')
);

const SelectMatch: React.FC<ISelectMatchProps> = ({ route }) => {
  const { matchId } = route.params;

  const { colors } = useTheme();
  const { goBack } = useNavigationWithParams();

  return (
    <>
      <Button
        onPress={goBack}
        variant={'empty'}
        alignSelf="flex-start"
        _text={{ color: colors.textAction }}
        mt={'5'}
        mb={'2.5'}
        px={'2.5'}
      >
        {I18n.t('common-close')}
      </Button>

      <SelectMatchContainer matchId={matchId} />
    </>
  );
};

export default SelectMatch;
