import React from 'react';
import {View} from 'react-native';

import MessageBox from 'screens/JoinUs/components/MessageBox/MessageBox';

import {useModel} from 'services/model';

import {model, LoginModelState} from 'core/controllers/loginController';

const MessagesContainer: React.FC = () => {
  const state = useModel<LoginModelState>(model);

  return (
    <View>
      <MessageBox steps={state.steps} currentStep={state.currentStep} />
    </View>
  );
};

export default MessagesContainer;
