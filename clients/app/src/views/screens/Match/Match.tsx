import React from 'react';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import Container from 'views/components/base/Container';
import MatchCatchComponent from './components/MatchCatchComponent';
import buildMatchesStore from 'stores/matches';
import { IMatchProps } from './types';

const MatchContainer = React.lazy(() => import('./containers/MatchContainer'));

const Match: React.FC<IMatchProps> = ({ route }) => {
  const { data } = route.params;
  const { setOptions } = useNavigationWithParams();

  const matchesStore = React.useMemo(() => buildMatchesStore(), []);
  const { single: storeSingle } = matchesStore.useSelector('single');

  const matchData = React.useMemo(() => {
    return storeSingle.data && storeSingle.status === 'success' ? storeSingle.data : data;
  }, [data, storeSingle.data, storeSingle.status]);

  React.useLayoutEffect(() => {
    setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => <MatchCatchComponent data={matchData} />,
    });
  }, [setOptions, matchData]);

  React.useEffect(() => {
    storeSingle.getSingle(data.id);
    // do we need to erase store on unmount?
  }, [storeSingle, data.id]);

  return (
    <Container withSuspense withBg>
      <MatchContainer data={matchData} />
    </Container>
  );
};

export default Match;
