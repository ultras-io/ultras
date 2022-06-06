import React from 'react';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
// import { commonScreens } from 'navigation/screens';
import MatchContainer from './containers/MatchContainer';
import { WithBg } from 'views/components/base/Bg';
import Like from 'views/components/base/Like';
import { IMatchProps } from './types';

const Match: React.FC<IMatchProps> = ({ route }) => {
  const { data } = route.params;
  const { setOptions } = useNavigationWithParams();

  React.useLayoutEffect(() => {
    setOptions({
      headerRight: () => <Like isLiked onPress={() => {}} />,
    });
  }, [setOptions]);

  return (
    <WithBg>
      <MatchContainer data={data} />
    </WithBg>
  );
};

export default Match;
