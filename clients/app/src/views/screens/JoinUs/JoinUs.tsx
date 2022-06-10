import React from 'react';
import { StyleSheet, ListRenderItem } from 'react-native';
import { Box, FlatList, Button } from 'native-base';
import useStep from './useStep';
import WithAnimation, {
  DirectionENum as AnimationDirection,
} from 'views/components/base/WithAnimation';
import LeftMessage from './components/LeftMessage';
import RightMessage from './components/RightMessage';
import messages from './content/messages';
import answers from './content/answers';
import type { ChatRow, ChatRowAnswer } from './types';

const animation_delay = 150;

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
  data.push({
    key: 'empty',
    type: 'empty',
  });
  return data;
};

const JoinUs: React.FC = () => {
  const [step, nextStep, jumpToStep] = useStep(1);
  const flatListRef = React.useRef({ scrollToEnd: () => {} });

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

  React.useLayoutEffect(() => {
    setTimeout(() => flatListRef?.current?.scrollToEnd(), animation_delay);
  }, [step]);

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

  const renderRightComponent = React.useCallback(
    (item: ChatRowAnswer) => {
      switch (item.data.type) {
        case 'button':
          return (
            <Box w={'70%'} alignSelf="flex-end" mr={5} my={2}>
              <Button onPress={nextStep} variant={'primary'}>
                {item.data.pre.text}
              </Button>
            </Box>
          );
      }
      return null;
    },
    [nextStep]
  );

  const renderStep: ListRenderItem<ChatRow> = React.useCallback(
    ({ item }) => {
      if (item.type === 'message') {
        return (
          <WithAnimation delay={animation_delay}>
            <LeftMessage
              item={item}
              jumpToStep={jumpToStep}
              text={userInfo.phoneNumber}
            />
          </WithAnimation>
        );
      } else if (item.type === 'answer') {
        if (step === item.data.id + 1) {
          return (
            <WithAnimation
              direction={AnimationDirection.Right2Left}
              delay={2 * animation_delay}
              key={'currentStep'}
            >
              {renderRightComponent(item)}
            </WithAnimation>
          );
        } else {
          return (
            <WithAnimation direction={AnimationDirection.Right2Left} key={'passedStep'}>
              <RightMessage {...getRightMessageOptions(item)} />
            </WithAnimation>
          );
        }
      } else if (item.type === 'empty') {
        return <Box h={'4'} />;
      }

      return null;
    },
    [step, jumpToStep, userInfo.phoneNumber, renderRightComponent, getRightMessageOptions]
  );

  return (
    <Box safeAreaBottom h={'full'}>
      <FlatList
        ref={flatListRef}
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
