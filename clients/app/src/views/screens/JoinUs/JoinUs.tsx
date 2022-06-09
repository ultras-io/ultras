import React from 'react';
import { StyleSheet, ListRenderItem } from 'react-native';
import { Box, FlatList } from 'native-base';
import useStep from './useStep';
import LeftMessage from './components/LeftMessage';
import RightMessage from './components/RightMessage';
import messages from './content/messages';
import answers from './content/answers';
import type { ChatRow, ChatRowAnswer } from './types';

const mergeData = (step: number): ChatRow[] => {
  const data: ChatRow[] = [];
  messages.slice(0, step).forEach((messagesList, i) => {
    data.push({
      type: 'message',
      key: 'message' + i,
      data: messagesList,
    });
    data.push({
      type: 'answer',
      key: 'answer' + i,
      data: { id: i, ...answers[i] },
    });
  });
  return data;
};

const JoinUs: React.FC = () => {
  const [step, nextStep, jumpToStep] = useStep(9);

  const userInfo = {
    phoneNumber: '+37499233353',
    team: {
      name: 'Chelsea FC',
    },
    code: '4 0 0 3',
    username: '__hayk',
    notificationsAllowed: false,
    locationEnabled: false,
  };

  const openTeamModal = React.useCallback(() => {
    // console.log('OpenModal');
  }, []);

  const getRightMessageOptions = React.useCallback(
    (item: ChatRowAnswer) => {
      const options = {
        messages: item.data.post.confirmed,
        confirmed: true,
        onPress: () => {},
        text: '',
      };

      if (item.data.type === 'selectTeam') {
        options.text = userInfo.team.name;
        options.onPress = openTeamModal;
      } else if (item.data.type === 'phoneNumber') {
        options.text = userInfo.phoneNumber;
      } else if (item.data.type === '4digits') {
        options.text = userInfo.code;
      } else if (item.data.type === 'username') {
        options.text = userInfo.username;
      } else if (item.data.type === 'notification' && !userInfo.notificationsAllowed) {
        options.messages = item.data.post.denied!;
        options.confirmed = false;
      } else if (item.data.type === 'location' && !userInfo.locationEnabled) {
        options.messages = item.data.post.denied!;
        options.confirmed = false;
      }

      return options;
    },
    [
      openTeamModal,
      userInfo.code,
      userInfo.locationEnabled,
      userInfo.notificationsAllowed,
      userInfo.phoneNumber,
      userInfo.team.name,
      userInfo.username,
    ]
  );

  const renderAnswer = React.useCallback(
    (item: ChatRowAnswer) => {
      if (step === item.data.id + 1) {
        // current step
        // console.log(item.data.pre);
        return null;
      } else {
        return <RightMessage {...getRightMessageOptions(item)} />;
      }
    },
    [step, getRightMessageOptions]
  );

  const renderStep: ListRenderItem<ChatRow> = React.useCallback(
    ({ item }) => {
      if (item.type === 'message') {
        return (
          <LeftMessage
            item={item}
            jumpToStep={jumpToStep}
            phoneNumber={userInfo.phoneNumber}
          />
        );
      } else if (item.type === 'answer') {
        return renderAnswer(item);
      }
      return null;
    },
    [jumpToStep, userInfo.phoneNumber, renderAnswer]
  );

  return (
    <Box safeAreaBottom h={'full'}>
      <FlatList
        data={mergeData(step)}
        renderItem={renderStep}
        keyExtractor={item => item.key}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </Box>
  );
};

export default JoinUs;

const styles = StyleSheet.create({
  contentContainerStyle: {
    marginTop: 15,
    paddingBottom: 30,
  },
});
