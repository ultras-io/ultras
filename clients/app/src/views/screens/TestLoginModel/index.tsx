import React, { useEffect } from 'react';
import useModel from 'core/controllers/loginController';

import { View, Text } from 'react-native';

function TestLoginModel() {
  const model = useModel();

  useEffect(() => {
    model.ping();
  }, [model]);

  return (
    <View>
      <Text>{model.isPending}</Text>
    </View>
  );
}

export default TestLoginModel;
