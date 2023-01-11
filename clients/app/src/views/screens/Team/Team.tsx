import React from 'react';
import TeamTabNavigation from './components/TeamTabNavigation';
import Container from 'views/components/base/Container';
import buildTeamsStore from 'stores/teams';
import { ITeamProps } from './types';

const TeamContainer = React.lazy(() => import('./containers/TeamContainer'));

const Team: React.FC<ITeamProps> = ({ route }) => {
  const { data, tabName } = route.params;

  const teamsStore = React.useMemo(() => buildTeamsStore(), []);
  const { single: storeSingle } = teamsStore.useSelector('single');

  const teamData = React.useMemo(() => {
    return storeSingle.data && storeSingle.status === 'success' ? storeSingle.data : data;
  }, [data, storeSingle.data, storeSingle.status]);

  React.useEffect(() => {
    storeSingle.getSingle(data.id);
    // do we need to erase store on unmount?
  }, [data.id, storeSingle]);

  return (
    <Container withSuspense withBg>
      <TeamContainer data={teamData} />
      <TeamTabNavigation tabName={tabName} id={teamData.id} />
    </Container>
  );
};

export default Team;
