import React from 'react';

import WithSafeArea from 'views/components/base/WithSafeArea';
import FanClubsContainer from 'views/containers/FanClubsHorizontal/FanClubsContainer';
import MatchesContainer from 'views/screens/Home/containers/MatchesContainer';

import { IHomeProps } from './types';

const Home: React.FC<IHomeProps> = () => {
  return (
    <WithSafeArea>
      <FanClubsContainer />
      <MatchesContainer />
    </WithSafeArea>
  );
};

export default Home;
