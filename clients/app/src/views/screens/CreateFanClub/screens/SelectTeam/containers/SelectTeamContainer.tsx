import React from 'react';
import buildTeamsStore from 'stores/teams';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import SearchTeamComponent from '../components/SearchTeamComponent';
import SelectTeamComponent from '../components/SelectTeamComponent';
import { fanClubsStore } from '../../../store';
import { ISelectTeamContainerProps } from '../types';

const SelectTeamContainer: React.FC<ISelectTeamContainerProps> = ({ teamId }) => {
  const { goBack } = useNavigationWithParams();
  const teamsStore = React.useMemo(() => buildTeamsStore(), []);

  const [searchText, setSearchText] = React.useState<string>('');
  const { list } = teamsStore.useSelector('list');

  React.useLayoutEffect(() => {
    teamsStore.updateFilter({ name: searchText });
    teamsStore.getAll();
  }, [teamsStore, searchText]);

  const onSelect = React.useCallback(
    (selectedTeamId: ResourceIdentifier) => {
      fanClubsStore.setAddFieldValue('teamId', selectedTeamId);
      goBack();
    },
    [goBack]
  );

  return (
    <>
      <SearchTeamComponent onChange={setSearchText} />

      <SelectTeamComponent
        data={list.data || []}
        loading={list.status === 'loading'}
        teamId={teamId}
        onSelect={onSelect}
        onEndReached={list.status === 'loading' ? undefined : teamsStore.getAll}
      />
    </>
  );
};

export default SelectTeamContainer;
