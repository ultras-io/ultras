import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import screens, {TAB_NAME} from './eventsScreens';

const Stack = createNativeStackNavigator();

const EventsNavigation = () => {
  return (
    <Stack.Navigator initialRouteName={screens.events.name}>
      <Stack.Screen
        name={`${TAB_NAME}:${screens.events.name}`}
        component={screens.events.component}
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

export default EventsNavigation;
