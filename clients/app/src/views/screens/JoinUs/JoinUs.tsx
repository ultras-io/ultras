import React from 'react';
import { ListRenderItem } from 'react-native';
import { Box, FlatList, Pressable, Text } from 'native-base';
import MessageBox from 'views/components/base/MessageBox';
import useStep from './useStep';
import messages from './content/messages';
import answers from './content/answers';

import type { ChatRow, Message } from './types';

const mergeData = (step: number): ChatRow[] => {
  const data: ChatRow[] = [];
  messages.slice(0, step).forEach((message, i) => {
    data.push({ id: 'message' + i, type: 'message', data: message });
    // data.push({ type: 'answer', data: answers[i] });
  });
  return data;
};

const JoinUs: React.FC = () => {
  const [step, , jumpToStep] = useStep(5);

  const renderMessage = React.useCallback(
    (messagesData: Message[]) => (
      <MessageBox>
        {messagesData.map(message => {
          const content = (
            <Text variant={'message'} {...message.textProps}>
              {typeof message.text === 'function'
                ? message.text('+374 99233353')
                : message.text}
            </Text>
          );
          return message.jumpToStep ? (
            <Pressable onPress={() => jumpToStep(message.jumpToStep!)}>
              {content}
            </Pressable>
          ) : (
            content
          );
        })}
      </MessageBox>
    ),
    [jumpToStep]
  );

  const renderStep: ListRenderItem<ChatRow> = React.useCallback(
    ({ item }) => {
      if (item.type === 'message') {
        return renderMessage(item.data as Message[]);
      }
      return null;
    },
    [renderMessage]
  );

  return (
    <Box safeAreaBottom h={'full'}>
      <FlatList
        data={mergeData(step)}
        renderItem={renderStep}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ marginTop: 15 }}
      />
    </Box>
  );
};

export default JoinUs;
