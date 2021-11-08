import React from 'react';

import WithSafeArea from 'views/components/base/WithSafeArea';
import TeamContainer from './containers/TeamContainer';

import {ITeamProps} from './types';

const Team: React.FC<ITeamProps> = ({route}) => {
  const {id} = route.params;
  return (
    <WithSafeArea>
      <TeamContainer id={id} />
    </WithSafeArea>
  );
};

export default Team;
