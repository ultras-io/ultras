import React from 'react';
import { useRoute } from '@react-navigation/native';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import CreateEventComponent from '../components/CreateEventComponent';
import { eventsStore } from '../../../store';
import { IRouteParams } from '../../../types';
import { commonScreens } from 'views/navigation/screens';

const CreateEventContainer: React.FC = () => {
  const { goBack, pushTo } = useNavigationWithParams();

  const { add } = eventsStore.useSelector('add');
  const route = useRoute() as IRouteParams;

  React.useEffect(() => {
    const matchId = route?.params?.matchId || undefined;
    eventsStore.setAddFieldValue('matchId', matchId);
  }, [route?.params?.matchId]);

  const onCreatePress = React.useCallback(() => {
    eventsStore.create();
  }, []);

  React.useEffect(() => {
    if (add.status === 'success') {
      const event = add.createdData;

      eventsStore.reset();
      goBack();

      if (event) {
        pushTo(commonScreens.event.name, { data: event });
      }
    }
  }, [add.createdData, add.status, goBack, pushTo]);

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
