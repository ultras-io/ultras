import React from 'react';
import {View, Text} from 'react-native';

// import StorageService from 'core/services/storage/storageService';

import {MessageProps} from './types';

import styles from './styles';

const Message: React.FC<MessageProps> = (props: MessageProps) => (
  <View style={styles.container}>
    <Text>{props.message}</Text>
  </View>
);

export default Message;
