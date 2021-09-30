import React from 'react';
import {View, Text} from 'react-native';

import {ISettingsProps} from './types';

import styles from './styles';

const Settings: React.FC<ISettingsProps> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings</Text>
    </View>
  );
};

export default Settings;
