import React from 'react';
import buildTeamsStore from 'stores/teams';
import { IState } from 'stores/authentication';
import TeamsComponent, { TeamsLoader } from '../components/TeamsComponent';
import { ITeamsContainerProps } from '../types';

const TeamsContainer: React.FC<ITeamsContainerProps> = ({ id, useStore }) => {
  // get user teams if id exist
  //else

  const userSelector = React.useCallback(() => (state: IState) => state.user, []);
  const user = useStore(userSelector());

  const teamsStoreRef = React.useRef(buildTeamsStore());

  React.useEffect(() => {
    teamsStoreRef.current.updateFilter({
      // teamId: user.teams,
      cityId: 101077,
    });
    teamsStoreRef.current.getAll();
  }, [user.teams]);

  const result = teamsStoreRef.current.useSelector('list');
  // @TODO handle error status
  if (!result.list.data && result.list.status === 'loading') return <TeamsLoader />;
  return result.list.data && <TeamsComponent data={result.list.data || []} />;
};

export default TeamsContainer;
