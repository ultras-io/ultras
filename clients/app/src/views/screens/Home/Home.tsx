import React from 'react';

import WithSafeArea from 'views/components/base/WithSafeArea';
import SupportersClubsContainer from 'views/screens/Home/containers/SupportersClubsContainer';

import {IHomeProps} from './types';

const Home: React.FC<IHomeProps> = () => {
  return (
    <WithSafeArea>
      <SupportersClubsContainer />
    </WithSafeArea>
  );
};

export default Home;
