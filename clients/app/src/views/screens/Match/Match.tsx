import React from 'react';

import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
// import commonScreens from 'navigation/commonScreens';

import MatchContainer from './containers/MatchContainer';
import WithSafeArea from 'views/components/base/WithSafeArea';
import Like from 'views/components/base/Like';

import { IMatchProps } from './types';

const Match: React.FC<IMatchProps> = ({ route }) => {
  const { id } = route.params;
  const { setOptions } = useNavigationWithParams();

  React.useLayoutEffect(() => {
    setOptions({
      headerRight: () => <Like isLiked onPress={() => {}} />,
    });
  }, [setOptions]);

  return (
    <WithSafeArea>
      <MatchContainer id={id} />
    </WithSafeArea>
  );
};

export default Match;
