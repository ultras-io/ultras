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
import type { IJounUsComponentProps, ChatRow, ChatRowAnswer } from '../types';

const animation_delay = 150;

const JoinUsComponent: React.FC<IJounUsComponentProps> = ({
  data,
  stepProps,
  confirmIdentity,
}) => {
  const flatListRef = React.useRef({ scrollToEnd: () => {} });
  const route = useRoute();
  const isKeyboardOpen = useKeyboard();
  const { openModal } = useNavigationWithParams();

  const [
    { step, nextStep, jumpToStep },
    { userState },
    { selectTeam, selectCountryCode },
    { isEmail, emailPhoneKey, emailPhoneKeyInvert, emailPhoneValue, swicthOther },
  ] = stepProps;

  React.useLayoutEffect(() => {
    setTimeout(() => flatListRef?.current?.scrollToEnd(), animation_delay);
  }, [step]);

  React.useLayoutEffect(() => {
    isKeyboardOpen && setTimeout(() => flatListRef?.current?.scrollToEnd(), 0);
  }, [isKeyboardOpen]);

  React.useEffect(() => {
    if (route.params?.selected) {
      if (route.params?.selected.dataType === 'team') selectTeam(route.params?.selected);
      else selectCountryCode(route.params?.selected);
    }
  }, [route.params?.selected]);

  const openListModal = React.useCallback(
    (dataKey: 'team' | 'country') => () => {
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
        options.text = userState.team?.name!;
        options.onPress = openListModal('team');
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
      openListModal,
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
          return (
            <JoinUsButton onPress={openListModal('team')} text={item.data.pre.text} />
          );
        case 'emailOrphone':
          return (
            <EmailOrPhone
              onPress={confirmIdentity}
              onModalOpen={openListModal('country')}
              code={userState.countryCode?.name!}
              isEmail={isEmail}
              emailPhoneKey={emailPhoneKey}
            />
          );
      }
      return null;
    },
    [
      nextStep,
      openListModal,
      confirmIdentity,
      userState.countryCode?.name,
      isEmail,
      emailPhoneKey,
    ]
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
        return <Box h={'50'} />;
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
