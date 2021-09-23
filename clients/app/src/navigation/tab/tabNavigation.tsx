import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import screens from './tabScreens';

const Tab = createBottomTabNavigator();

const TabNavigation: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName={screens.home.name}
      screenOptions={{headerShown: false}}>
      <Tab.Screen name={screens.home.name} component={screens.home.component} />
      <Tab.Screen
        name={screens.search.name}
        component={screens.search.component}
      />
      <Tab.Screen
        name={screens.matches.name}
        component={screens.matches.component}
      />
      <Tab.Screen
        name={screens.events.name}
        component={screens.events.component}
      />
      <Tab.Screen
        name={screens.profile.name}
        component={screens.profile.component}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
