import React from 'react';
import initStore, { IState } from 'stores/registration';
import initAuthStore from 'stores/authentication';
import JoinUsComponent from '../components/JoinUsComponent';
import { messages, messageLogin } from '../content/messages';
import { answers, answerLogin } from '../content/answers';
import type { ChatRow } from '../types';

const mergeData = (loginStep: boolean, step: number): ChatRow[] => {
  const data: ChatRow[] = [];
  messages.slice(0, loginStep ? step - 1 : step).forEach((messagesList, i) => {
    data.push({ type: 'message', key: 'message' + i, data: messagesList });
    data.push({ type: 'answer', key: 'answer' + i, data: { id: i, ...answers[i] } });
  });
  if (loginStep) {
    data.push({ type: 'message', key: 'message' + (step - 1), data: messageLogin });
    data.push({
      type: 'answer',
      key: 'answer' + (step - 1),
      data: { id: step - 1, ...answerLogin },
    });
  }
  data.push({ key: 'empty', type: 'empty' });
  return data;
};

const useRegistrationStore = initStore();
const useAuthenticationStore = initAuthStore();

const JoinUsContainer: React.FC = () => {
  const loginStep = useRegistrationStore((state: IState) => state.loginStep);
  const step = useRegistrationStore((state: IState) => state.step);

  return (
    <JoinUsComponent
      data={mergeData(loginStep, step)}
      useStore={useRegistrationStore}
      useAuthStore={useAuthenticationStore}
    />
  );
};

export default JoinUsContainer;
