import React from 'react';
import { Text } from 'native-base';
import I18n from 'i18n/i18n';
import buildTeamsStore from 'stores/teams';
import { ISelectedTeamProps } from '../types';
import { Loader } from 'views/components/base/ListComponents';
import KeyValue from 'views/components/base/KeyValue';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';

const store = buildTeamsStore();

const SelectedTeamComponent: React.FC<ISelectedTeamProps> = ({ teamId }) => {
  const { pushTo } = useNavigationWithParams();
  const { single } = store.useSelector('single');

  React.useEffect(() => {
    if (teamId) {
      store.getSingle(teamId);
    }
  }, [teamId]);

  const rightComponent = React.useMemo(() => {
    if (!teamId) {
      return (
        <Text variant={'matchDate'} onPress={() => pushTo('SelectTeam')}>
          {I18n.t('common-select')}
        </Text>
      );
    }

    if (single.status === 'loading') {
      return <Loader />;
    }

    return (
      <Text variant={'matchDate'} onPress={() => pushTo('SelectTeam')}>
        {single.data?.name}
      </Text>
    );
  }, [pushTo, single.data?.name, single.status, teamId]);

  return (
    <KeyValue
      name={I18n.t('fanClubs-add-details-team')}
      description={I18n.t('fanClubs-add-details-teamDescription')}
      value={rightComponent}
    />
  );
};

export default SelectedTeamComponent;
