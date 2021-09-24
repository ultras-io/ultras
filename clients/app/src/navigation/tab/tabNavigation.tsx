import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import screens from './tabScreens';

const Tab = createBottomTabNavigator();

const TabNavigation: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName={screens.home.name}
      screenOptions={{headerShown: false}}>
      <Tab.Screen
        name={screens.home.name}
        component={screens.home.component}
        initialParams={{tabName: screens.home.name}}
      />
      <Tab.Screen
        name={screens.search.name}
        component={screens.search.component}
        initialParams={{tabName: screens.search.name}}
      />
      <Tab.Screen
        name={screens.matches.name}
        component={screens.matches.component}
        initialParams={{tabName: screens.matches.name}}
      />
      <Tab.Screen
        name={screens.events.name}
        component={screens.events.component}
        initialParams={{tabName: screens.events.name}}
      />
      <Tab.Screen
        name={screens.profile.name}
        component={screens.profile.component}
        initialParams={{tabName: screens.profile.name}}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
