import React from 'react';
import { useRoute } from '@react-navigation/native';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import CreateEventComponent from '../components/CreateEventComponent';
import { eventsStore } from '../../../store';
import { IRouteParams } from '../../../types';

const CreateEventContainer: React.FC = () => {
  const { goBack } = useNavigationWithParams();

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
      storeAdd.reset();
      goBack();

      // @TODO: show success message
    }
  }, [storeAdd.status, storeAdd, goBack]);

console.log(JSON.stringify(storeAdd, null, 2));
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
