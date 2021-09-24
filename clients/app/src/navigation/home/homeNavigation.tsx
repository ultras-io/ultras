import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import screens, {TAB_NAME} from './homeScreens';

const Stack = createNativeStackNavigator();

const HomeNavigation = () => {
  return (
    <Stack.Navigator initialRouteName={screens.home.name}>
      <Stack.Screen
        name={`${TAB_NAME}:${screens.home.name}`}
        component={screens.home.component}
        initialParams={{tabName: TAB_NAME}}
      />
      <Stack.Screen
        name={`${TAB_NAME}:${screens.event.name}`}
        component={screens.event.component}
        initialParams={{tabName: TAB_NAME}}
      />
      <Stack.Screen
        name={`${TAB_NAME}:${screens.match.name}`}
        component={screens.match.component}
        initialParams={{tabName: TAB_NAME}}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigation;
