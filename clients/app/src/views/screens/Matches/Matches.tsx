import React from 'react';

import WithSafeArea from 'views/components/base/WithSafeArea';
import MatchesContainer from './containers/MatchesContainer';

import {IMatchesProps} from './types';

const Matches: React.FC<IMatchesProps> = () => {
  return (
    <WithSafeArea>
      <MatchesContainer />
    </WithSafeArea>
  );
};

export default Matches;
