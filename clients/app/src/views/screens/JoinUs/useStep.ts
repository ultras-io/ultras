import React from 'react';
import {
  UseStepType,
  UserStateType,
  UserStateKeyType,
  UserStateValueType,
  SelectType,
} from './types';

const emailOrPhoneI18Keys = ['email', 'phone'];

const useStep = (initialStep: number): UseStepType => {
  // steps
  const [step, setStep] = React.useState<number>(initialStep);

  const nextStep = React.useCallback(() => {
    setStep(step + 1);
  }, [step, setStep]);

  const jumpToStep = React.useCallback(
    (st: number) => {
      setStep(st);
    },
    [setStep]
  );

  // user State
  const [userState, setUserState] = React.useState<UserStateType>({
    phoneNumber: '+37499233353',
    email: 'haykblrtsyan@gmail.com',
    team: {
      id: '2323',
      name: 'Chelsea',
    },
    countryCode: {
      id: '23',
      name: '+374',
    },
    code: '4 0 0 3',
    username: '__hayk',
    notificationsAllowed: false,
    locationEnabled: true,
  });

  const updateUser = React.useCallback(
    (key: UserStateKeyType, value: UserStateValueType) => {
      setUserState(prevState => ({
        ...prevState,
        [key]: value,
      }));
    },
    []
  );

  // team
  const [isTeamAlreasySelected, setIsTeamAlreasySelected] = React.useState(false);

  const selectTeam = React.useCallback(
    (team: SelectType) => {
      updateUser('team', { id: team.id, name: team.name });

      if (!isTeamAlreasySelected) {
        nextStep();
      }
      setIsTeamAlreasySelected(true);
    },
    [isTeamAlreasySelected, nextStep, updateUser]
  );

  // email | phone
  const [emailOrPhoneIndex, setEmailOrPhoneIndex] = React.useState(0);
  const selectCountryCode = React.useCallback(
    (code: SelectType) => {
      updateUser('countryCode', { id: code.id, name: code.name });

      if (!isTeamAlreasySelected) {
        nextStep();
      }
      setIsTeamAlreasySelected(true);
    },
    [isTeamAlreasySelected, nextStep, updateUser]
  );

  return [
    {
      step,
      nextStep,
      jumpToStep,
    },
    {
      userState,
      updateUser,
    },
    {
      selectTeam,
      selectCountryCode,
    },
    {
      isEmail: emailOrPhoneIndex === 0,
      emailPhoneKey: emailOrPhoneI18Keys[emailOrPhoneIndex],
      emailPhoneKeyInvert: emailOrPhoneI18Keys[1 - emailOrPhoneIndex],
      emailPhoneValue: emailOrPhoneIndex === 0 ? userState.email : userState.phoneNumber,
      swicthOther: () => setEmailOrPhoneIndex(index => 1 - index),
    },
  ];
};

export default useStep;
