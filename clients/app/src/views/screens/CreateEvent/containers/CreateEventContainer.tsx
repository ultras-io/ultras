import React from 'react';
import { useRoute } from '@react-navigation/native';
import buildEventsStore from 'stores/events/events';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import CreateEventComponent from '../components/CreateEventComponent';
import { RouteParamsInterface } from '../types';

const eventsStore = buildEventsStore();

const CreateEventContainer: React.FC = () => {
  const { goBack } = useNavigationWithParams();

  const { add } = eventsStore.useSelector('add');
  const route = useRoute() as RouteParamsInterface;

  React.useEffect(() => {
    const matchId = route?.params?.matchId || undefined;
    eventsStore.setAddFieldValue('matchId', matchId);
  }, [route?.params?.matchId]);

  const onCreatePress = React.useCallback(() => {
    eventsStore.create();
  }, []);

  React.useEffect(() => {
    if (add.status === 'success') {
      eventsStore.reset();
      goBack();

      // @TODO: show success message
    }
  }, [add.status, goBack]);

  return (
    <CreateEventComponent
      loading={add.status === 'loading'}
      data={add.data}
      setAddFieldValue={eventsStore.setAddFieldValue}
      onCreatePress={onCreatePress}
    />
  );
};

export default CreateEventContainer;
