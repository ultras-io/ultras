import React from 'react';
import initStore, { IState } from 'stores/registration';
import JoinUsComponent from '../components/JoinUsComponent';
import messages from '../content/messages';
import answers from '../content/answers';
import type { ChatRow } from '../types';

const mergeData = (step: number): ChatRow[] => {
  const data: ChatRow[] = [];
  messages.slice(0, step).forEach((messagesList, i) => {
    data.push({ type: 'message', key: 'message' + i, data: messagesList });
    data.push({ type: 'answer', key: 'answer' + i, data: { id: i, ...answers[i] } });
  });
  data.push({ key: 'empty', type: 'empty' });
  return data;
};

const JoinUsContainer: React.FC = () => {
  const useRegistrationStore = initStore();
  const step = useRegistrationStore((state: IState) => state.step);

  return <JoinUsComponent data={mergeData(step)} useStore={useRegistrationStore} />;
};

export default JoinUsContainer;
