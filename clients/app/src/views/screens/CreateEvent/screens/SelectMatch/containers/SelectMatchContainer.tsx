import React from 'react';
import buildMatchesStore from 'stores/matches';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import SelectMatchComponent from '../components/SelectMatchComponent';
import { eventsStore } from '../../../store';
import { ISelectMatchContainerProps } from '../types';

const SelectMatchContainer: React.FC<ISelectMatchContainerProps> = ({ matchId }) => {
  const { goBack } = useNavigationWithParams();
  const matchesStore = React.useMemo(() => buildMatchesStore(), []);

  const { list } = matchesStore.useSelector('list');

  React.useEffect(() => {
    matchesStore.getAll();
  }, [matchesStore]);

  const onSelect = React.useCallback(
    (selectedMatchId: ResourceIdentifier) => {
      eventsStore.setAddFieldValue('matchId', selectedMatchId);
      goBack();
    },
    [goBack]
  );

  return (
    <SelectMatchComponent
      data={list.data && list.status === 'success' ? list.data : []}
      matchId={matchId}
      onSelect={onSelect}
    />
  );
};

export default SelectMatchContainer;
