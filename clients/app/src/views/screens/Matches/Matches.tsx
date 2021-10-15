import React from 'react';
import {ImageBackground} from 'react-native';

import testBg from 'assets/images/testBG.png';

import MatchesContainer from './containers/MatchesContainer';

import {IMatchesProps} from './types';
import gStyles from 'styles/styles';

const Matches: React.FC<IMatchesProps> = () => {
  return (
    <ImageBackground
      source={testBg}
      resizeMode="cover"
      style={gStyles.containerBg}>
      <MatchesContainer />
    </ImageBackground>
  );
};

export default Matches;
