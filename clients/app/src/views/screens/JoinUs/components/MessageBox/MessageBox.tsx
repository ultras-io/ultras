import React from 'react';
import {View} from 'react-native';

// import StorageService from 'core/services/storage/storageService';

import {MessageBoxProps} from './types';

// import styles from './styles';
import Message from '../Message';

const MessageBox: React.FC<MessageBoxProps> = (props: MessageBoxProps) => (
  <View>
    {props?.steps?.map(item => (
      <Message message={item.stepId.toString()} />
      // every type has it's ui, and will get processStepMethod specified for that process
      // it is need to show Question, Answer as messages
    ))}
  </View>
);

export default React.memo<MessageBoxProps>(MessageBox);
