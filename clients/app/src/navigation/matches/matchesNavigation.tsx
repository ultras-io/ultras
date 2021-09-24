import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import screens, {TAB_NAME} from './matchesScreens';

const Stack = createNativeStackNavigator();

const MatchesNavigation = () => {
  return (
    <Stack.Navigator initialRouteName={screens.matches.name}>
      <Stack.Screen
        name={`${TAB_NAME}:${screens.matches.name}`}
        component={screens.matches.component}
        initialParams={{tabName: TAB_NAME}}
      />
      <Stack.Screen
        name={`${TAB_NAME}:${screens.match.name}`}
        component={screens.match.component}
        initialParams={{tabName: TAB_NAME}}
      />
      <Stack.Screen
        name={`${TAB_NAME}:${screens.event.name}`}
        component={screens.event.component}
        initialParams={{tabName: TAB_NAME}}
      />
    </Stack.Navigator>
  );
};

export default MatchesNavigation;
