import React, {useCallback} from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';

import StorageService from '../../core/services/storage/storageService';

import {IJoinUsProps} from './types';

import styles from './styles';

const JoinUs: React.FC<IJoinUsProps> = () => {
  const authenticateUser = useCallback(() => {
    // StorageService.setAuthToken('token');
    StorageService.setItem('xx', '123');
  }, []);

  // const print = useCallback(async () => {
  //   const xx = await StorageService.getItem('xx');
  //   Alert.alert(xx);
  // }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Join us</Text>

      <TouchableWithoutFeedback onPress={authenticateUser}>
        <Text>Log in</Text>
      </TouchableWithoutFeedback>
      {/* <TouchableWithoutFeedback onPress={print}>
        <Text>Print</Text>
      </TouchableWithoutFeedback> */}
    </View>
  );
};

export default JoinUs;
