import React from 'react';
import MatchesContainer from './containers/MatchesContainer';
import { WithBg } from 'views/components/base/Bg';
import { IMatchesProps } from './types';

const Matches: React.FC<IMatchesProps> = () => {
  return (
    <WithBg size={'lg'}>
      <MatchesContainer />
    </WithBg>
  );
};

export default Matches;
