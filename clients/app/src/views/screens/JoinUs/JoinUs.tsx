import React, {useState, useRef, useCallback, Fragment} from 'react';
import {View, KeyboardAvoidingView, FlatList, Platform} from 'react-native';
import I18n from 'i18n/i18n';

import LocationService from 'services/location/locationService';
import WithSafeArea from 'views/components/base/WithSafeArea';

import scenario from './content';
import WithAnimation from 'views/components/base/WithAnimation';
import UltrasText from 'views/components/base/UltrasText';
import Avatar, {SizeEnum as AvatarSize} from 'views/components/base/Avatar';
import MessageBox, {
  SideEnum as MessageSide,
} from 'views/components/base/MessageBox';
import Button, {SizeEnum as ButtonSize} from 'views/components/base/Button';
import Icon from 'views/components/base/Icon';
import {IconNamesEnum as Icons} from '../../../assets/icons';
import PhoneInput from 'views/components/compositions/PhoneInput';
import FourDigitsContainer from 'views/containers/FourDigitsContainer';
import Input, {TypeEnum as InputType} from 'views/components/base/Input';

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

const getKeyboardOffset = (step: number): number => {
  if (step === 3) return 20;
  if (step === 4) return 70;
  if (step === 5) return 20;
  return 0;
};

const JoinUs: React.FC<IJoinUsProps> = () => {
  const [step, setStep] = useState<number>(1);
  const [phoneNumber, setPhoneNumber] = useState({code: '', number: ''});
  const [isLocationEnabled, setIsLocationEnabled] = useState(false);
  const [code, setCode] = useState<string>('');

  const flatListRef = useRef<FlatList<any>>();

  const changeNumber = useCallback(() => {
    setStep(3);
  }, [setStep]);

  // create containet and move this logic
  const checkPhone = useCallback(() => {
    // get number from component
    // validate number
    // show validation error if needed
    // or set number if its correct

    setPhoneNumber({code: '+374', number: '99233353'});
    setStep(step + 1);
  }, [setPhoneNumber, setStep, step]);

  const requestLocation = useCallback(async () => {
    setIsLocationEnabled(await LocationService.requestLocation());
    setStep(step + 1);
  }, [setIsLocationEnabled, setStep, step]);

  const renderMessages = useCallback(
    (id: number, messages: Array<Message & AnimationProp>) => {
      return messages
        .sort((a, b) => b.messageId - a.messageId)
        .map((m, i) => {
          return (
            <WithAnimation
              key={id + '-' + m.messageId}
              delay={DELAY_DELTA * m.messageId}
              direction={m.direction}>
              {i === 0 && (
                <View style={styles.avatar}>
                  <Avatar size={AvatarSize.Small} />
                </View>
              )}
              <View style={styles.messageWithAvatar}>
                <MessageBox>
                  {m.type === MessageTypeEnum.Default && m.message}
                  {m.type === MessageTypeEnum.Phone &&
                    m.messageRenderer &&
                    m.messageRenderer(
                      phoneNumber.code + phoneNumber.number,
                      changeNumber,
                      step < 5,
                    )}
                </MessageBox>
              </View>
            </WithAnimation>
          );
        });
    },
    [phoneNumber, changeNumber, step],
  );

  const renderStep = ({item}: {item: ScenarStep}) => {
    return (
      <>
        <WithAnimation
          delay={(item.messages.length + 1) * DELAY_DELTA}
          direction={item.action.direction}>
          <View style={styles.step}>
            {item.id + 1 === step ? (
              // currently on this step
              <>
                {/* rendering PhoneInput if Action type is Phone */}
                {item.action.type === ActionTypeEnum.Phone && (
                  <View style={styles.rightMessage}>
                    <PhoneInput
                      code={phoneNumber.code}
                      number={phoneNumber.number}
                    />
                  </View>
                )}
                {/* rendering 4 Digit if Action type is PhoneConfirm */}
                {item.action.type === ActionTypeEnum.PhoneConfirm && (
                  <View style={styles.phoneConfirm}>
                    <FourDigitsContainer
                      passStep={acceptedCode => {
                        setCode(acceptedCode);
                        setStep(step + 1);
                      }}
                    />
                  </View>
                )}
                {/* rendering UserName Input if Action type is UserName */}
                {item.action.type === ActionTypeEnum.UserName && (
                  <View style={styles.rightMessage}>
                    <Input withBorder type={InputType.Text} name="Username" />
                  </View>
                )}
                {/* rendering Button */}
                {item.action.type !== ActionTypeEnum.PhoneConfirm && (
                  <View style={styles.action}>
                    <Button
                      title={item.action.title}
                      // isDisabled={true}
                      onPress={() => {
                        if (item.action.type === ActionTypeEnum.Button) {
                          setStep(step + 1);
                        } else if (
                          item.action.type === ActionTypeEnum.UserName
                        ) {
                          setStep(step + 1);
                        } else if (
                          item.action.type === ActionTypeEnum.AllowNotifications
                        ) {
                          setStep(step + 1);
                        } else if (
                          item.action.type === ActionTypeEnum.AllowLocation
                        ) {
                          requestLocation();
                        } else if (
                          item.action.type === ActionTypeEnum.StartApp
                        ) {
                          setStep(step + 1);
                        } else if (item.action.type === ActionTypeEnum.Phone) {
                          checkPhone();
                        }
                      }}
                      size={ButtonSize.Big}
                      bgColor="primary"
                    />
                  </View>
                )}
              </>
            ) : (
              // step already passed
              // rendering user's message
              <>
                <MessageBox side={MessageSide.Right}>
                  <UltrasText style={styles.actionText} color="text">
                    <Icon
                      key="icon"
                      name={
                        item.action.type === ActionTypeEnum.AllowLocation &&
                        !isLocationEnabled
                          ? Icons.Hearth // warn
                          : Icons.Hearth
                      }
                      size={12}
                    />{' '}
                    {item.action.type === ActionTypeEnum.Button &&
                      item.action.title}
                    {item.action.type === ActionTypeEnum.Phone &&
                      phoneNumber.code + phoneNumber.number}
                    {item.action.type === ActionTypeEnum.PhoneConfirm && code}
                    {item.action.type === ActionTypeEnum.AllowLocation &&
                      (isLocationEnabled
                        ? I18n.t('joinUsLocationEnabled')
                        : I18n.t('joinUsLocationNotEnabled'))}
                  </UltrasText>
                </MessageBox>
                {item.action.type === ActionTypeEnum.AllowLocation &&
                  !isLocationEnabled && (
                    <UltrasText style={styles.actionSubText} color="text">
                      {I18n.t('joinUsLocationNotEnabledText')}
                    </UltrasText>
                  )}
              </>
            )}
          </View>
        </WithAnimation>
        {/* // rendering bot's message(s) */}
        {renderMessages(item.id, item.messages)}
      </>
    );
  };

  const data = scenario.filter(stepContent => stepContent.id < step);

  setTimeout(() => flatListRef?.current?.scrollToIndex({index: 0}), 200);

  return (
    <WithSafeArea>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={
          Platform.OS === 'ios' ? getKeyboardOffset(step) : 0
        }>
        <FlatList
          ref={flatListRef}
          style={styles.flatList}
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
