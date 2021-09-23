import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import screens from './eventsScreens';

const Stack = createNativeStackNavigator();

const EventsNavigation = () => {
  return (
    <Stack.Navigator initialRouteName={screens.events.name}>
      <Stack.Screen
        name={screens.events.name}
        component={screens.events.component}
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

export default EventsNavigation;
