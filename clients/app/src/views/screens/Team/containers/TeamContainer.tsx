import React from 'react';
import TeamComponent from '../components/TeamComponent';
// import buildFavoriteTeamsStore from 'stores/favoriteTeams';
import initAuthStore, { IState } from 'stores/authentication';
import { ITeamContainerProps } from '../types';

const useAuthenticationStore = initAuthStore();

const TeamContainer: React.FC<ITeamContainerProps> = ({ data }) => {
  // const favoriteTeamsStoreRef = React.useRef(buildFavoriteTeamsStore());
  const teamIdRef = React.useRef();

  const userSelector = React.useCallback(() => (state: IState) => state.user, []);
  const updateTeamsSelector = React.useCallback(
    () => (state: IState) => state.updateTeams,
    []
  );
  const user = useAuthenticationStore(userSelector());
  const updateTeams = useAuthenticationStore(updateTeamsSelector());

  const isFavorite = React.useMemo(
    () => user.teams.indexOf(data.id) !== -1,
    [data.id, user.teams]
  );

  const update = React.useCallback(
    teamId => {
      teamIdRef.current = teamId;
      if (isFavorite) {
        if (user.teams.length > 1) {
          updateTeams(teamId, 'remove');
        }
      } else {
        updateTeams(teamId, 'add');
        // favoriteTeamsStoreRef.current.setFieldValue('teamId', teamId);
        // favoriteTeamsStoreRef.current.create();
      }
    },
    [isFavorite, updateTeams, user.teams.length]
  );

  // React.useEffect(() => {
  //   teamsStoreRef.current.getSingle(data.id);
  //   // do we need to erase store on unmount?
  // }, [data.id]);

  // const result = favoriteTeamsStoreRef.current.add;
  // console.log(result);
  // console.log(isFavorite);

  return <TeamComponent data={data} isFavorite={isFavorite} updateTeams={update} />;
};

export default TeamContainer;
