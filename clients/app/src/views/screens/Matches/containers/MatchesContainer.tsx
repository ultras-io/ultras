import React from 'react';
import { View } from 'react-native';

import MatchesComponent from '../components/MatchesComponent';

import { IMatchesContainerProps } from '../types';
import styles from '../styles';

import { generateMatches } from 'utils/helpers/dummy';

const MatchesContainer: React.FC<IMatchesContainerProps> = () => {
  const [data, setData] = React.useState<Array<any>>([]);

  const getData = React.useCallback(() => {
    const matchesData = generateMatches(10);
    setData([...data, ...matchesData]);
  }, [setData, data]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(getData, []);

  return (
    <View style={styles.container}>
      <MatchesComponent data={data} onEndReached={getData} />
    </View>
  );
};

export default MatchesContainer;
