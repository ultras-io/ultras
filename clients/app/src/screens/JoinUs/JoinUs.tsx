import React from 'react';
import {View, Text} from 'react-native';

// import StorageService from 'core/services/storage/storageService';

import {useModel} from 'core/services/model';
import model, {StateType, ping} from 'core/controllers/loginController';

import Button from 'components/base/Button';

import {IJoinUsProps} from './types';

import styles from './styles';

const JoinUs: React.FC<IJoinUsProps> = () => {
  const state = useModel<Partial<StateType>>(model);

  // const authenticateUser = useCallback(() => {
  // StorageService.setAuthToken('token');
  // StorageService.setItem('xx', '123');
  // }, []);

  // const print = useCallback(async () => {
  //   const xx = await StorageService.getItem('xx');
  // }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Join us</Text>
      <Text style={styles.text}>
        {state.isPending ? 'pending .... ' : state?.data?.body?.message}
      </Text>
      <Button title="Log in" onPress={ping} />
    </View>
  );
};

export default JoinUs;
