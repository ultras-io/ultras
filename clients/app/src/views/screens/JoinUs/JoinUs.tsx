import React from 'react';
import {View, Text} from 'react-native';

// import StorageService from 'core/services/storage/storageService';

// import {useModel} from 'core/services/model';
// import model, {StateType} from 'core/controllers/loginController';

import {IJoinUsProps} from './types';

import styles from './styles';
import MessageBox from './components/MessageBox/MessageBox';

const JoinUs: React.FC<IJoinUsProps> = () => {
  // const authenticateUser = useCallback(() => {
  // StorageService.setAuthToken('token');
  // StorageService.setItem('xx', '123');
  // }, []);

  // const print = useCallback(async () => {
  //   const xx = await StorageService.getItem('xx');
  // }, []);

  return (
    <View style={styles.container}>
      <View style={styles.titleBox}>
        <Text style={styles.titleText}>Join us</Text>
      </View>
      <MessageBox />
    </View>
  );
};

export default JoinUs;
