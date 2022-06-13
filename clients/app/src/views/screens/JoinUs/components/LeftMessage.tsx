import React, { useCallback } from 'react';
import { Pressable, Text } from 'native-base';
import MessageBox from 'views/components/base/MessageBox';
import type { Message, ILeftMessageProps } from '../types';

const LeftMessage: React.FC<ILeftMessageProps> = ({
  item,
  step,
  jumpToStep,
  change,
  emailPhoneKey,
  emailPhoneKeyInvert,
  emailPhoneValue,
}) => {
  const renderText = useCallback(
    message => {
      if (typeof message.text === 'string') {
        return message.text; // text
      }
      if (message.pressable) {
        if (message.change) {
          return message.text(emailPhoneKeyInvert); // [Sign Up with Phone Number]
        }
        return message.text(emailPhoneKey); // [Change Email]
      }
      return message.text(emailPhoneValue); // [example@gmail.com]
    },
    [emailPhoneKey, emailPhoneKeyInvert, emailPhoneValue]
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
                        change();
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
