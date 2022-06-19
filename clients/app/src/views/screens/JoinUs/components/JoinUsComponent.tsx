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
import type { IState } from 'stores/registration';
import type { IJoinUsComponentProps, ChatRow, ChatRowAnswer } from '../types';
import { dataKeyType } from 'views/screens/SearchListModal/types';

const animation_delay = 150;

const JoinUsComponent: React.FC<IJoinUsComponentProps> = ({ data, useStore }) => {
  const flatListRef = React.useRef({ scrollToEnd: () => {} });
  const route = useRoute();
  const isKeyboardOpen = useKeyboard();
  const { openModal } = useNavigationWithParams();
  const [isTeamSelected, setIsTeamSelected] = React.useState(false);

  const step = useStore((state: IState) => state.step);
  const selectedTeamName = useStore((state: IState) => state.user.team.name);
  const emailOrPhone = useStore((state: IState) => state.user.joinVia.value);
  const code = useStore((state: IState) => state.user.code);

  const nextStep = useStore((state: IState) => state.nextStep);
  const setSelected = useStore((state: IState) => state.setSelected);

  React.useLayoutEffect(() => {
    setTimeout(() => flatListRef?.current?.scrollToEnd(), animation_delay);
  }, [step]);

  React.useLayoutEffect(() => {
    isKeyboardOpen && setTimeout(() => flatListRef?.current?.scrollToEnd(), 0);
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
      } else if (item.data.type === 'emailOrphone') {
        options.text = emailOrPhone;
      } else if (item.data.type === '4digits') {
        options.text = code.split('').join(' ');
      }
      // else if (item.data.type === 'username') {
      //   options.text = userState.username!;
      // } else if (item.data.type === 'notification' && !userState.notificationsAllowed) {
      //   options.messages = item.data.post.denied!;
      //   options.confirmed = false;
      // } else if (item.data.type === 'location' && !userState.locationEnabled) {
      //   options.messages = item.data.post.denied!;
      //   options.confirmed = false;
      // }
      return options;
    },
    [openListModal, selectedTeamName, emailOrPhone, code]
  );

  const renderRightComponent = React.useCallback(
    (item: ChatRowAnswer) => {
      switch (item.data.type) {
        case 'button':
          return <JoinUsButton onPress={nextStep} text={item.data.pre.text} />;
        case 'selectTeam':
          return (
            <JoinUsButton onPress={openListModal('team')} text={item.data.pre.text} />
          );
        case 'emailOrphone':
          return (
            <EmailOrPhone useStore={useStore} onModalOpen={openListModal('country')} />
          );
        case '4digits':
          return <FourDigits useStore={useStore} />;
        case 'username':
          return <Username useStore={useStore} />;
      }
      return null;
    },
    [nextStep, openListModal, useStore]
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