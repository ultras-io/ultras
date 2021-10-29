import React from 'react';

import WithSafeArea from 'views/components/base/WithSafeArea';
import SupportersClubsContainer from 'views/screens/Home/containers/SupportersClubsContainer';
import MatchesContainer from 'views/screens/Home/containers/MatchesContainer';

import {IHomeProps} from './types';

const Home: React.FC<IHomeProps> = () => {
  return (
    <WithSafeArea>
      <SupportersClubsContainer />
      <MatchesContainer />
    </WithSafeArea>
  );
};

export default Home;
