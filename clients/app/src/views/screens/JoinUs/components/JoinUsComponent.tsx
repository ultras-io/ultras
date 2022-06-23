import React from 'react';
import { StyleSheet, ListRenderItem, Platform } from 'react-native';
import { Box, FlatList, KeyboardAvoidingView } from 'native-base';
import { useRoute } from '@react-navigation/native';
import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import { useKeyboard } from 'utils/hooks/useKeyboard';
import { rootScreens } from 'views/navigation/screens';
import WithAnimation, {
  DirectionENum as AnimationDirection,
} from 'views/components/base/WithAnimation';
import LeftMessage from './LeftMessage';
import RightMessage from './RightMessage';
import JoinUsButton from './JoinUsButton';
import EmailOrPhone from './EmailOrPhone';
import FourDigits from './FourDigits/FourDigits';
import Username from './Username';
import EnableLocation from './EnableLocation';
import Login from './Login';
import type { IState } from 'stores/registration';
import type { IJoinUsComponentProps, ChatRow, ChatRowAnswer } from '../types';
import { dataKeyType } from 'views/screens/SearchListModal/types';

const animation_delay = 150;

const JoinUsComponent: React.FC<IJoinUsComponentProps> = ({
  data,
  useStore,
  useAuthStore,
}) => {
  const flatListRef = React.useRef({ scrollToEnd: () => {} });
  const route = useRoute();
  const isKeyboardOpen = useKeyboard();
  const { openModal } = useNavigationWithParams();
  const [isTeamSelected, setIsTeamSelected] = React.useState(false);

  const stepSelector = React.useCallback(() => (state: IState) => state.step, []);
  const selectedTeamNameSelector = React.useCallback(
    () => (state: IState) => state.user.team.name,
    []
  );
  const emailOrPhoneSelector = React.useCallback(
    () => (state: IState) => state.user.joinVia.value,
    []
  );
  const codeSelector = React.useCallback(() => (state: IState) => state.user.code, []);
  const usernameSelector = React.useCallback(
    () => (state: IState) => state.user.username,
    []
  );
  const notificationsAllowedSelector = React.useCallback(
    () => (state: IState) => state.user.notificationsAllowed,
    []
  );
  const locationEnabledSelector = React.useCallback(
    () => (state: IState) => state.user.locationEnabled,
    []
  );
  const nextStepSelector = React.useCallback(() => (state: IState) => state.nextStep, []);
  const setSelectedSelector = React.useCallback(
    () => (state: IState) => state.setSelected,
    []
  );

  const step = useStore(stepSelector());
  const selectedTeamName = useStore(selectedTeamNameSelector());
  const emailOrPhone = useStore(emailOrPhoneSelector());
  const code = useStore(codeSelector());
  const username = useStore(usernameSelector());
  const notificationsAllowed = useStore(notificationsAllowedSelector());
  const locationEnabled = useStore(locationEnabledSelector());
  const nextStep = useStore(nextStepSelector());
  const setSelected = useStore(setSelectedSelector());

  React.useLayoutEffect(() => {
    setTimeout(() => flatListRef?.current?.scrollToEnd(), animation_delay);
  }, [step]);

  React.useLayoutEffect(() => {
    isKeyboardOpen && setTimeout(() => flatListRef?.current?.scrollToEnd(), 10);
  }, [isKeyboardOpen]);

  React.useEffect(() => {
    if (route.params?.selected) {
      setSelected(route.params?.selected);
      if (route.params?.selected.dataType === 'team' && !isTeamSelected) {
        setIsTeamSelected(true);
        nextStep();
      }
    }
  }, [route.params?.selected]);

  const openListModal = React.useCallback(
    (dataKey: dataKeyType) => () => {
      openModal(rootScreens.searchListModal.name, {
        dataKey,
        parentScreenName: route.name,
      });
    },
    [openModal, route.name]
  );

  const getRightMessageOptions = React.useCallback(
    (item: ChatRowAnswer) => {
      const options = {
        messages: item.data.post.confirmed,
        confirmed: true,
        onPress: () => {},
        text: '',
      };

      if (item.data.type === 'selectTeam') {
        options.text = selectedTeamName;
        options.onPress = openListModal('team');
      } else if (item.data.type === 'emailOrPhone') {
        options.text = emailOrPhone;
      } else if (item.data.type === '4digits') {
        options.text = code.split('').join(' ');
      } else if (item.data.type === 'username') {
        options.text = username;
      } else if (item.data.type === 'notification') {
        options.messages = notificationsAllowed
          ? item.data.post.confirmed!
          : item.data.post.denied!;
        options.confirmed = notificationsAllowed;
      } else if (item.data.type === 'location') {
        options.messages = locationEnabled
          ? item.data.post.confirmed!
          : item.data.post.denied!;
        options.confirmed = locationEnabled;
      }
      return options;
    },
    [
      selectedTeamName,
      openListModal,
      emailOrPhone,
      code,
      username,
      notificationsAllowed,
      locationEnabled,
    ]
  );

  const renderRightComponent = React.useCallback(
    (item: ChatRowAnswer) => {
      switch (item.data.type) {
        case 'button':
          return <JoinUsButton onPress={nextStep} text={item.data.pre.text} />;
        case 'emailOrPhone':
          return (
            <EmailOrPhone useStore={useStore} onModalOpen={openListModal('country')} />
          );
        case '4digits':
          return <FourDigits useStore={useStore} />;
        case 'selectTeam':
          return (
            <JoinUsButton onPress={openListModal('team')} text={item.data.pre.text} />
          );
        case 'username':
          return <Username useStore={useStore} />;
        case 'notification':
          return <JoinUsButton onPress={nextStep} text={item.data.pre.text} />;
        case 'location':
          return <EnableLocation useStore={useStore} text={item.data.pre.text} />;
        case 'login':
          return (
            <Login
              useStore={useStore}
              useAuthStore={useAuthStore}
              text={item.data.pre.text}
              login
            />
          );
        case 'register':
          return (
            <Login
              useStore={useStore}
              useAuthStore={useAuthStore}
              text={item.data.pre.text}
              login={false}
            />
          );
      }
      return null;
    },
    [nextStep, openListModal, useStore, useAuthStore]
  );

  const renderStep: ListRenderItem<ChatRow> = React.useCallback(
    ({ item }) => {
      if (item.type === 'message') {
        return (
          <WithAnimation delay={animation_delay}>
            <LeftMessage item={item} useStore={useStore} />
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
        return <Box h={'60'} />;
      }

      return null;
    },
    [getRightMessageOptions, renderRightComponent, step, useStore]
  );

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderStep}
        keyExtractor={item => item.key}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </KeyboardAvoidingView>
  );
};

export default JoinUsComponent;

const styles = StyleSheet.create({
  contentContainerStyle: {
    marginTop: 15,
  },
});
