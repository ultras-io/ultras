import React from 'react';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import Container from 'views/components/base/Container';
import MatchCatchComponent from './components/MatchCatchComponent';
import { IMatchProps } from './types';

const MatchContainer = React.lazy(() => import('./containers/MatchContainer'));

const Match: React.FC<IMatchProps> = ({ route }) => {
  const { data } = route.params;
  const { setOptions } = useNavigationWithParams();

  React.useLayoutEffect(() => {
    setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => <MatchCatchComponent data={data} />,
    });
  }, [setOptions, data]);

  return (
    <Container withSuspense withBg>
      <MatchContainer data={data} />
    </Container>
  );
};

export default Match;
