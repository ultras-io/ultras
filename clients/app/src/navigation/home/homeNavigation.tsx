import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import screens from './homeScreens';

const Stack = createNativeStackNavigator();

const HomeNavigation = () => {
  return (
    <Stack.Navigator initialRouteName={screens.home.name}>
      <Stack.Screen
        name={screens.home.name}
        component={screens.home.component}
      />
      <Stack.Screen
        name={screens.event.name}
        component={screens.event.component}
      />
      <Stack.Screen
        name={screens.match.name}
        component={screens.match.component}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigation;
