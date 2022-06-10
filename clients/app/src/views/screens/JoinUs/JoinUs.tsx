import React from 'react';
import { StyleSheet, ListRenderItem } from 'react-native';
import { Box, FlatList } from 'native-base';
import { useRoute } from '@react-navigation/native';
import useStep from './useStep';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import { rootScreens } from 'views/navigation/screens';
import WithAnimation, {
  DirectionENum as AnimationDirection,
} from 'views/components/base/WithAnimation';
import LeftMessage from './components/LeftMessage';
import RightMessage from './components/RightMessage';
import JoinUsButton from './components/JoinUsButton';
import messages from './content/messages';
import answers from './content/answers';
import type { ChatRow, ChatRowAnswer } from './types';

const animation_delay = 150;

const mergeData = (step: number): ChatRow[] => {
  const data: ChatRow[] = [];
  messages.slice(0, step).forEach((messagesList, i) => {
    data.push({ type: 'message', key: 'message' + i, data: messagesList });
    data.push({ type: 'answer', key: 'answer' + i, data: { id: i, ...answers[i] } });
  });
  data.push({ key: 'empty', type: 'empty' });
  return data;
};

const JoinUs: React.FC = () => {
  const flatListRef = React.useRef({ scrollToEnd: () => {} });
  const route = useRoute();
  const { openModal } = useNavigationWithParams();
  const [
    { step, nextStep, jumpToStep },
    { userState },
    { selectTeam },
    { isEmail, emailPhoneKey, emailPhoneKeyInvert, emailPhoneValue, swicthOther },
  ] = useStep(1);

  React.useLayoutEffect(() => {
    setTimeout(() => flatListRef?.current?.scrollToEnd(), animation_delay);
  }, [step]);

  React.useEffect(() => {
    route.params?.team && selectTeam(route.params?.team);
  }, [route.params?.team]);

  const openTeamsModal = React.useCallback(() => {
    openModal(rootScreens.searchListModal.name, {
      dataKey: 'team',
      parentScreenName: route.name,
    });
  }, [openModal, route.name]);

  const getRightMessageOptions = React.useCallback(
    (item: ChatRowAnswer) => {
      const options = {
        messages: item.data.post.confirmed,
        confirmed: true,
        onPress: () => {},
        text: '',
      };

      if (item.data.type === 'selectTeam') {
        options.text = userState.team?.name!;
        options.onPress = openTeamsModal;
      } else if (item.data.type === 'emailOrphone') {
        options.text = emailPhoneValue!;
      } else if (item.data.type === '4digits') {
        options.text = userState.code!;
      } else if (item.data.type === 'username') {
        options.text = userState.username!;
      } else if (item.data.type === 'notification' && !userState.notificationsAllowed) {
        options.messages = item.data.post.denied!;
        options.confirmed = false;
      } else if (item.data.type === 'location' && !userState.locationEnabled) {
        options.messages = item.data.post.denied!;
        options.confirmed = false;
      }
      return options;
    },
    [
      emailPhoneValue,
      openTeamsModal,
      userState.code,
      userState.locationEnabled,
      userState.notificationsAllowed,
      userState.team?.name,
      userState.username,
    ]
  );

  const renderRightComponent = React.useCallback(
    (item: ChatRowAnswer) => {
      switch (item.data.type) {
        case 'button':
          return <JoinUsButton onPress={nextStep} text={item.data.pre.text} />;
        case 'selectTeam':
          return <JoinUsButton onPress={openTeamsModal} text={item.data.pre.text} />;
        case 'emailOrphone':
          return <Box>{isEmail ? 'email' : 'phone number'}</Box>;
      }
      return null;
    },
    [nextStep, openTeamsModal, isEmail]
  );

  const renderStep: ListRenderItem<ChatRow> = React.useCallback(
    ({ item }) => {
      if (item.type === 'message') {
        return (
          <WithAnimation delay={animation_delay}>
            <LeftMessage
              item={item}
              step={step}
              jumpToStep={jumpToStep}
              change={swicthOther}
              emailPhoneKey={emailPhoneKey}
              emailPhoneKeyInvert={emailPhoneKeyInvert}
              emailPhoneValue={emailPhoneValue}
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
    [
      emailPhoneKey,
      emailPhoneKeyInvert,
      emailPhoneValue,
      getRightMessageOptions,
      jumpToStep,
      renderRightComponent,
      step,
      swicthOther,
    ]
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
