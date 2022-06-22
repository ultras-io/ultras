import React from 'react';
import { Pressable, Text, HStack, VStack } from 'native-base';
import MessageBox from 'views/components/base/MessageBox';
import Icon from 'views/components/base/Icon';
import { Icons as Icons } from 'assets/icons';
import type { AnswerPost, IRightMessageProps } from '../types';

const RightMessage: React.FC<IRightMessageProps> = ({
  messages,
  onPress,
  text,
  confirmed,
}) => {
  return (
    <VStack>
      <MessageBox
        side="right"
        denied={!confirmed}
        bottomText={!confirmed ? messages[0].description : ''}
      >
        <HStack>
          <Icon
            name={confirmed ? Icons.Check : Icons.Warning}
            color={'iconPrimary'}
            size={'ic-sm'}
            mt={'.5'}
            mr={'1.5'}
          />
          <VStack>
            {messages.map((message: AnswerPost, key) => {
              const content = (
                <Text key={key} variant={'messageInvert'} {...message.textProps}>
                  {typeof message.text === 'function' ? message.text(text) : message.text}
                </Text>
              );
              return message.pressable ? (
                <Pressable key={key} onPress={onPress}>
                  {content}
                </Pressable>
              ) : (
                content
              );
            })}
          </VStack>
        </HStack>
      </MessageBox>
    </VStack>
  );
};

export default React.memo<IRightMessageProps>(RightMessage);
