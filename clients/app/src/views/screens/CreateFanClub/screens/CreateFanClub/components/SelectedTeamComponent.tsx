import React from 'react';
import { Text } from 'native-base';
import I18n from 'i18n/i18n';
import buildTeamsStore from 'stores/teams';
import { ISelectedTeamProps } from '../types';
import { Loader } from 'views/components/base/ListComponents';
import KeyValue from 'views/components/base/KeyValue';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import { commonScreens } from 'views/navigation/screens';
import { useRoute } from '@react-navigation/native';

const store = buildTeamsStore();

const SelectedTeamComponent: React.FC<ISelectedTeamProps> = ({ teamId }) => {
  const { pushTo } = useNavigationWithParams();
  const { single } = store.useSelector('single');

  const route = useRoute();

  React.useEffect(() => {
    if (teamId) {
      store.getSingle(teamId);
    }
  }, [teamId]);

  const openTeams = React.useCallback(() => {
    const tabName = route.params?.tabName;
    const screenName = route.name.slice(tabName.length + 1);

    pushTo('SearchList', {
      dataKey: 'team',
      parentScreenName: screenName,
    });
  }, [pushTo, route.name, route.params]);

  const rightComponent = React.useMemo(() => {
    if (!teamId) {
      return (
        <Text variant={'matchDate'} onPress={openTeams}>
          {I18n.t('common-select')}
        </Text>
      );
    }

    if (single.status === 'loading') {
      return <Loader />;
    }

    return (
      <Text variant={'matchDate'} onPress={openTeams}>
        {single.data?.name}
      </Text>
    );
  }, [openTeams, single.data?.name, single.status, teamId]);

  return (
    <KeyValue
      name={I18n.t('fanClubs-add-details-team')}
      description={I18n.t('fanClubs-add-details-teamDescription')}
      value={rightComponent}
    />
  );
};

export default SelectedTeamComponent;
