import React, {useCallback} from 'react';
import {View, Text} from 'react-native';

// import StorageService from 'core/services/storage/storageService';

import Button from 'components/base/Button';

import {IJoinUsProps} from './types';

import styles from './styles';

const JoinUs: React.FC<IJoinUsProps> = () => {
  const authenticateUser = useCallback(() => {
    // StorageService.setAuthToken('token');
    // StorageService.setItem('xx', '123');
  }, []);

  // const print = useCallback(async () => {
  //   const xx = await StorageService.getItem('xx');
  // }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Join us</Text>
      <Button title="Log in" onPress={authenticateUser} />
    </View>
  );
};

export default JoinUs;
