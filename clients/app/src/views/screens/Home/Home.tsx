import React from 'react';
import FanClubsContainer from 'views/containers/FanClubsHorizontal/FanClubsContainer';
import MatchesContainer from 'views/screens/Home/containers/MatchesContainer';
import { IHomeProps } from './types';

const Home: React.FC<IHomeProps> = () => {
  return (
    <>
      <FanClubsContainer />
      <MatchesContainer />
    </>
  );
};

export default Home;
