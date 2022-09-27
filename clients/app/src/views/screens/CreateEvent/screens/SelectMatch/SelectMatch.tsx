import React from 'react';
import BackButtonComponent from '../../components/BackButtonComponent';
import { ISelectMatchProps } from './types';

const SelectMatchContainer = React.lazy(
  () => import('./containers/SelectMatchContainer')
);

const SelectMatch: React.FC<ISelectMatchProps> = ({ route }) => {
  const { matchId } = route.params;

  return (
    <>
      <BackButtonComponent action="back" />
      <SelectMatchContainer matchId={matchId} />
    </>
  );
};

export default SelectMatch;
