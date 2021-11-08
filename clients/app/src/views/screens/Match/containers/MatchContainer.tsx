import React from 'react';

import MatchComponent from '../components/MatchComponent';

import {generateMatch} from 'utils/helpers/dummy';

import {IMatchContainerProps} from '../types';

const MatchContainer: React.FC<IMatchContainerProps> = ({id}) => {
  // get club's data by id
  const data = generateMatch();

  return <MatchComponent data={data} />;
};

export default MatchContainer;
