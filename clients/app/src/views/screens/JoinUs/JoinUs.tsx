import React from 'react';
import { View, KeyboardAvoidingView, FlatList, Platform } from 'react-native';
import I18n from 'i18n/i18n';

import scenario from './content';

import LocationService from '../../../services/location/locationService';
import WithSafeArea from 'views/components/base/WithSafeArea';

import useNavigationWithParams from 'utils/hooks/useNavigationWithParams';
import { rootScreens } from 'views/navigation/screens';
import { dataTypeEnum as SearchListKey } from 'views/screens/SearchListModal';

import WithAnimation from 'views/components/base/WithAnimation';
import UltrasText from 'views/components/base/UltrasText';
import Avatar, { SizeEnum as AvatarSize } from 'views/components/base/Avatar';
import MessageBox, { SideEnum as MessageSide } from 'views/components/base/MessageBox';
import Button, {
  SizeEnum as ButtonSize,
  BoxSizeEnum as ButtonBoxSizeEnum,
  AppearanceEnum as ButtonAppearance,
} from 'views/components/base/Button';
import Icon from 'views/components/base/Icon';
import { IconNamesEnum as Icons } from 'assets/icons';
import PhoneInput from 'views/components/compositions/PhoneInput';
import FourDigitsContainer from 'views/containers/FourDigitsContainer';
import Input, { TypeEnum as InputType } from 'views/components/base/Input';

import {
  IJoinUsProps,
  ScenarStep,
  ActionTypeEnum,
  MessageTypeEnum,
  Message,
  AnimationProp,
} from './types';
import styles from './styles';

const DELAY_DELTA = 200;
const NUMBER_STEP = 4;

const getKeyboardOffset = (step: number): number => {
  if (step === 4) return 20;
  if (step === 5) return 64;
  if (step === 6) return 20;
  return 0;
};

const JoinUs: React.FC<IJoinUsProps> = () => {
  const [step, setStep] = React.useState<number>(1);
  const [phoneNumber, setPhoneNumber] = React.useState({ code: '', number: '' });
  const [isLocationEnabled, setIsLocationEnabled] = React.useState(false);
  const [code, setCode] = React.useState<string>('');
  const [team, setTeam] = React.useState<{ id: number; name: string }>({
    id: 0,
    name: '',
  });
  const { openModal } = useNavigationWithParams();

  const flatListRef = React.useRef<FlatList<any>>();

  const changeNumber = React.useCallback(() => {
    setStep(NUMBER_STEP);
  }, [setStep]);

  // create containet and move this logic
  const checkPhone = React.useCallback(() => {
    // get number from component
    // validate number
    // show validation error if needed
    // or set number if its correct

    setPhoneNumber({ code: '+374', number: '99233353' });
    setStep(step + 1);
  }, [setPhoneNumber, setStep, step]);

  const openTeamModal = React.useCallback(() => {
    openModal(rootScreens.searchListModal.name, {
      dataKey: SearchListKey.Team,
    });
    // remove this
    setTeam({ id: 1, name: 'Manchester City' });
    setStep(step + 1);
  }, [openModal, setStep, step, setTeam]);

  const requestLocation = React.useCallback(async () => {
    setIsLocationEnabled(await LocationService.hasLocationPermission());
    setStep(step + 1);
  }, [setIsLocationEnabled, setStep, step]);

  const renderPhoneInput = React.useCallback(
    () => (
      <View style={styles.rightMessage}>
        <PhoneInput code={phoneNumber.code} number={phoneNumber.number} />
      </View>
    ),
    [phoneNumber]
  );

  const render4DigitsInput = React.useCallback(
    () => (
      <View style={styles.phoneConfirm}>
        <FourDigitsContainer
          passStep={acceptedCode => {
            setCode(acceptedCode);
            setStep(step + 1);
          }}
        />
      </View>
    ),
    [setCode, setStep, step]
  );

  const renderUserNameInput = React.useCallback(
    () => (
      <View style={styles.rightMessage}>
        <Input withBorder type={InputType.Text} name="Username" />
      </View>
    ),
    []
  );

  const renderActionButton = React.useCallback(
    item => {
      let onPress = () => setStep(step + 1);
      if (item.action.type === ActionTypeEnum.Team) onPress = () => openTeamModal();
      if (item.action.type === ActionTypeEnum.AllowLocation)
        onPress = () => requestLocation();
      if (item.action.type === ActionTypeEnum.Phone) onPress = () => checkPhone();

      return (
        <View style={styles.action}>
          <Button
            title={item.action.title}
            // isDisabled={true}
            onPress={onPress}
            size={ButtonSize.Big}
            bgColor="primary"
          />
        </View>
      );
    },
    [setStep, step, openTeamModal, requestLocation, checkPhone]
  );

  const getMessageIcon = React.useCallback(
    item =>
      !isLocationEnabled && item.action.type === ActionTypeEnum.AllowLocation
        ? Icons.Warning
        : Icons.Check,
    [isLocationEnabled]
  );

  const getMessageText = React.useCallback(
    item => {
      switch (item.action.type) {
        case ActionTypeEnum.Button:
          return item.action.title;
        case ActionTypeEnum.Phone:
          return phoneNumber.code + phoneNumber.number;
        case ActionTypeEnum.PhoneConfirm:
          return code;
        case ActionTypeEnum.AllowLocation:
          return isLocationEnabled
            ? I18n.t('joinUsLocationEnabled')
            : I18n.t('joinUsLocationNotEnabled');
        case ActionTypeEnum.Team:
          return team.name;
        default:
          return '';
      }
    },
    [code, isLocationEnabled, phoneNumber, team]
  );

  const getMessageButton = React.useCallback(
    item =>
      item.action.type === ActionTypeEnum.Team ? (
        <View style={styles.messageActionRight}>
          <Button
            onPress={openTeamModal}
            title={I18n.t('tapToChange')}
            appearance={ButtonAppearance.UnderLined}
            boxSize={ButtonBoxSizeEnum.Contain}
            size={ButtonSize.Small}
          />
        </View>
      ) : null,
    [openTeamModal]
  );

  const getMessageSubText = React.useCallback(
    item =>
      !isLocationEnabled && item.action.type === ActionTypeEnum.AllowLocation ? (
        <UltrasText style={styles.actionSubText} color="text">
          {I18n.t('joinUsLocationNotEnabledText')}
        </UltrasText>
      ) : null,
    [isLocationEnabled]
  );

  const renderStepAsMessages = React.useCallback(
    item => (
      <>
        <MessageBox side={MessageSide.Right}>
          <UltrasText style={styles.actionText} color="text">
            <Icon key="icon" name={getMessageIcon(item)} size={12} />{' '}
            {getMessageText(item)}
          </UltrasText>
          {getMessageButton(item)}
        </MessageBox>
        {getMessageSubText(item)}
      </>
    ),
    [getMessageButton, getMessageIcon, getMessageSubText, getMessageText]
  );

  const getBotsAvatar = React.useCallback(
    (index: number) =>
      index === 0 ? (
        <View style={styles.avatar}>
          <Avatar size={AvatarSize.Small} />
        </View>
      ) : null,
    []
  );

  const getBotsMessageButton = React.useCallback(
    (type: MessageTypeEnum) =>
      type === MessageTypeEnum.Phone ? (
        <>
          <UltrasText style={styles.textBold}>
            {phoneNumber.code + phoneNumber.number}
          </UltrasText>
          {step < NUMBER_STEP + 2 && (
            <View style={styles.messageActionLeft}>
              <Button
                appearance={ButtonAppearance.UnderLined}
                size={ButtonSize.Small}
                color="quaternary"
                title={I18n.t('changeNumber')}
                onPress={changeNumber}
              />
            </View>
          )}
        </>
      ) : null,
    [changeNumber, phoneNumber, step]
  );

  const renderBotsMessages = React.useCallback(
    (id: number, messages: Array<Message & AnimationProp>) =>
      messages
        .sort((a, b) => b.messageId - a.messageId)
        .map((m, i) => (
          <WithAnimation
            key={id + '-' + m.messageId}
            delay={DELAY_DELTA * m.messageId}
            direction={m.direction}
          >
            {getBotsAvatar(i)}
            <View style={styles.messageWithAvatar}>
              <MessageBox>
                {m.message}
                {getBotsMessageButton(m.type)}
              </MessageBox>
            </View>
          </WithAnimation>
        )),
    [getBotsAvatar, getBotsMessageButton]
  );

  const renderStep = React.useCallback(
    ({ item }: { item: ScenarStep }) => (
      <>
        <WithAnimation
          delay={(item.messages.length + 1) * DELAY_DELTA}
          direction={item.action.direction}
        >
          <View style={styles.step}>
            {item.id + 1 === step ? (
              <>
                {item.action.type === ActionTypeEnum.Phone && renderPhoneInput()}
                {item.action.type === ActionTypeEnum.PhoneConfirm && render4DigitsInput()}
                {item.action.type === ActionTypeEnum.UserName && renderUserNameInput()}
                {item.action.type !== ActionTypeEnum.PhoneConfirm &&
                  renderActionButton(item)}
              </>
            ) : (
              renderStepAsMessages(item)
            )}
          </View>
        </WithAnimation>
        {renderBotsMessages(item.id, item.messages)}
      </>
    ),
    [
      render4DigitsInput,
      renderActionButton,
      renderBotsMessages,
      renderPhoneInput,
      renderStepAsMessages,
      renderUserNameInput,
      step,
    ]
  );

  const data = scenario.filter(stepContent => stepContent.id < step);

  React.useEffect(() => {
    setTimeout(() => flatListRef?.current?.scrollToIndex({ index: 0 }));
  }, [step]);

  return (
    <WithSafeArea>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={
          Platform.OS === 'ios' ? getKeyboardOffset(step) : undefined
        }
      >
        <FlatList
          ref={flatListRef}
          data={data}
          renderItem={renderStep}
          inverted
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          maintainVisibleContentPosition={{
            minIndexForVisible: 0,
          }}
        />
      </KeyboardAvoidingView>
    </WithSafeArea>
  );
};

export default JoinUs;
