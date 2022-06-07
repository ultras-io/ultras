import React from 'react';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import Container from 'views/components/base/Container';
import Like from 'views/components/base/Like';
import { IMatchProps } from './types';

const MatchContainer = React.lazy(() => import('./containers/MatchContainer'));

const Match: React.FC<IMatchProps> = ({ route }) => {
  const { data } = route.params;
  const { setOptions } = useNavigationWithParams();

  React.useLayoutEffect(() => {
    setOptions({
      headerRight: () => <Like isLiked onPress={() => {}} />,
    });
  }, [setOptions]);

  return (
    <Container withSuspense withBg>
      <MatchContainer data={data} />
    </Container>
  );
};

export default Match;
