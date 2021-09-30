import React from 'react';
import {View} from 'react-native';

import UltrasText from 'views/components/base/UltrasText';
import {ISettingsProps} from './types';

import styles from './styles';

const Settings: React.FC<ISettingsProps> = () => {
  return (
    <View style={styles.container}>
      <UltrasText style={styles.text}>Settings</UltrasText>
    </View>
  );
};

export default Settings;
