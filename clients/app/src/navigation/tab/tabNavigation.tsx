import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {withTheme} from 'styled-components/native';

import {ThemeInterface} from 'styled-components';

import screens from './tabScreens';

const Tab = createBottomTabNavigator();

interface ITabNavigationProps {
  theme?: ThemeInterface;
}

const TabNavigation: React.FC<ITabNavigationProps> = ({theme}) => {
  return (
    <Tab.Navigator
      initialRouteName={screens.home.name}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme?.colors.bgColor,
          borderTopColor: theme?.colors.opacityBgColor,
        },
        tabBarActiveTintColor: theme?.colors.secondary,
        tabBarInactiveTintColor: theme?.colors.secondaryText,
      }}>
      <Tab.Screen
        name={screens.home.name}
        component={screens.home.component}
        initialParams={{tabName: screens.home.name}}
        options={screens.home.options}
      />
      <Tab.Screen
        name={screens.search.name}
        component={screens.search.component}
        initialParams={{tabName: screens.search.name}}
        options={screens.search.options}
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
        options={{tabBarBadge: ''}}
      />
    </Tab.Navigator>
  );
};

export default React.memo<ITabNavigationProps>(withTheme(TabNavigation));
