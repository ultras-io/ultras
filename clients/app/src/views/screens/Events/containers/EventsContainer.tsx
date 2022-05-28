import React from 'react';
import Box from 'views/components/base/Box';
import EventsComponent from '../components/EventsComponent';

import { IEventsContainerProps } from '../types';
import styles from '../styles';

import { generateEvents } from 'utils/helpers/dummy';

const EventsContainer: React.FC<IEventsContainerProps> = () => {
  const [data, setData] = React.useState<Array<any>>([]);

  const getData = React.useCallback(() => {
    const eventsData = generateEvents(5);
    setData([...data, ...eventsData]);
  }, [setData, data]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(getData, []);

  return (
    <Box style={styles.container} bgColor="screenBackground">
      <EventsComponent data={data} onEndReached={getData} />
    </Box>
  );
};

export default EventsContainer;
