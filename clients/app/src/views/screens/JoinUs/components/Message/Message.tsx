import React from 'react';
import {View} from 'react-native';

import UltrasText from 'views/components/base/UltrasText';
// import StorageService from 'core/services/storage/storageService';

import {MessageProps} from './types';

import styles from './styles';

const Message: React.FC<MessageProps> = (props: MessageProps) => (
  <View style={styles.container}>
    <UltrasText>{props.message}</UltrasText>
  </View>
);

export default Message;
