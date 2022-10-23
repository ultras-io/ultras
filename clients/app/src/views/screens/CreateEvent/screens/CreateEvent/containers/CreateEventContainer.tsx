import React from 'react';
import { useRoute } from '@react-navigation/native';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import CreateEventComponent from '../components/CreateEventComponent';
import { eventsStore } from '../../../store';
import { IRouteParams } from '../../../types';
import { commonScreens } from 'views/navigation/screens';

const CreateEventContainer: React.FC = () => {
  const { goBack, pushTo } = useNavigationWithParams();

  const { add: storeAdd } = eventsStore.useSelector('add');
  const route = useRoute() as IRouteParams;

  React.useEffect(() => {
    const matchId = route?.params?.matchId || undefined;
    storeAdd.setFieldValue('matchId', matchId);
  }, [route?.params?.matchId, storeAdd]);

  const onCreatePress = React.useCallback(() => {
    storeAdd.create();
  }, [storeAdd]);

  React.useEffect(() => {
    if (storeAdd.status === 'success') {
      const event = storeAdd.createdData;

      storeAdd.reset();
      goBack();

      setImmediate(() => {
        if (event) {
          pushTo(commonScreens.event.name, { data: event });
        }
      });
    }
  }, [goBack, pushTo, storeAdd, storeAdd.status]);

  return (
    <CreateEventComponent
      loading={storeAdd.status === 'loading'}
      data={storeAdd.data}
      setFieldValue={storeAdd.setFieldValue}
      onCreatePress={onCreatePress}
    />
  );
};

export default CreateEventContainer;
