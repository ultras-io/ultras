import React from 'react';
import BackButton from 'views/components/base/BackButton';
import { ISelectMatchProps } from './types';

const SelectMatchContainer = React.lazy(
  () => import('./containers/SelectMatchContainer')
);

const SelectMatch: React.FC<ISelectMatchProps> = ({ route }) => {
  const { matchId } = route.params;

  return (
    <>
      <BackButton action="back" type="icon" />
      <SelectMatchContainer matchId={matchId} />
    </>
  );
};

export default SelectMatch;
