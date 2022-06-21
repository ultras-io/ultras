import React, { useCallback } from 'react';
import { Pressable, Text } from 'native-base';
import MessageBox from 'views/components/base/MessageBox';
import type { IState } from 'stores/registration';
import type { Message, ILeftMessageProps } from '../types';

const LeftMessage: React.FC<ILeftMessageProps> = ({ item, useStore }) => {
  const step = useStore((state: IState) => state.step);
  const joinViaKey = useStore((state: IState) => state.user.joinVia.key);
  const joinViaKeyInvert = useStore((state: IState) => state.user.joinVia.keyInvert);
  const joinViaValue = useStore((state: IState) => state.user.joinVia.value);
  const jumpToStep = useStore((state: IState) => state.jumpToStep);
  const switchJoinMethod = useStore((state: IState) => state.switchJoinMethod);

  const renderText = useCallback(
    message => {
      if (typeof message.text === 'string') {
        return message.text; // text
      }
      if (message.email) {
        if (message.change) {
          return message.text(joinViaKeyInvert); // [Sign Up with Phone Number]
        }
        return message.text(joinViaKey); // [Change Email]
      }
      return message.text(joinViaValue); // [example@gmail.com]
    },
    [joinViaKey, joinViaKeyInvert, joinViaValue]
  );

  return (
    <>
      {item.data.map((messagesList: Message[], i) => (
        <MessageBox key={item.key + i}>
          {messagesList.map((message: Message, j) => {
            if (message.availableBefore && step > message.availableBefore) {
              return null;
            }

            const content = (
              <Text key={item.key + j} variant={'message'} {...message.textProps}>
                {renderText(message)}
              </Text>
            );

            return message.pressable ? (
              <Pressable
                key={item.key + j}
                onPress={
                  message.change
                    ? () => {
                        switchJoinMethod();
                        jumpToStep(message.jumpToStep!);
                      }
                    : () => jumpToStep(message.jumpToStep!)
                }
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
