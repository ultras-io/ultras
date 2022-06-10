import React from 'react';
import { Pressable, Text } from 'native-base';
import MessageBox from 'views/components/base/MessageBox';
import type { Message, ILeftMessageProps } from '../types';

const LeftMessage: React.FC<ILeftMessageProps> = ({ item, jumpToStep, text }) => {
  return (
    <>
      {item.data.map((messagesList: Message[], i) => (
        <MessageBox key={item.key + i}>
          {messagesList.map((message: Message, j) => {
            const content = (
              <Text key={item.key + j} variant={'message'} {...message.textProps}>
                {typeof message.text === 'function' ? message.text(text) : message.text}
              </Text>
            );
            return message.jumpToStep ? (
              <Pressable
                key={item.key + j}
                onPress={() => jumpToStep(message.jumpToStep!)}
              >
                {content}
              </Pressable>
            ) : (
              content
            );
          })}
        </MessageBox>
      ))}
    </>
  );
};

export default React.memo<ILeftMessageProps>(LeftMessage);
