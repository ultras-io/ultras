import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import screens from './matchesScreens';

const Stack = createNativeStackNavigator();

const MatchesNavigation = () => {
  return (
    <Stack.Navigator initialRouteName={screens.matches.name}>
      <Stack.Screen
        name={screens.matches.name}
        component={screens.matches.component}
      />
      <Stack.Screen
        name={screens.match.name}
        component={screens.match.component}
      />
      <Stack.Screen
        name={screens.event.name}
        component={screens.event.component}
      />
    </Stack.Navigator>
  );
};

export default MatchesNavigation;
