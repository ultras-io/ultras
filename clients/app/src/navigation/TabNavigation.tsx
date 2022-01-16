import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { withTheme } from 'styled-components/native';

import { ThemeInterface } from 'styled-components';

import { tabScreens } from './screens';

const Tab = createBottomTabNavigator();

interface ITabNavigationProps {
  theme?: ThemeInterface;
}

const TabNavigation: React.FC<ITabNavigationProps> = ({ theme }) => {
  return (
    <Tab.Navigator
      initialRouteName={tabScreens.home.name}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme?.colors.bgColor,
          borderTopColor: theme?.colors.opacityBgColor,
        },
        tabBarActiveTintColor: theme?.colors.secondary,
        tabBarInactiveTintColor: theme?.colors.secondaryText,
      }}
    >
      <Tab.Screen
        name={tabScreens.home.name}
        component={tabScreens.home.component}
        initialParams={{ tabName: tabScreens.home.name }}
        options={tabScreens.home.options}
      />
      <Tab.Screen
        name={tabScreens.search.name}
        component={tabScreens.search.component}
        initialParams={{ tabName: tabScreens.search.name }}
        options={tabScreens.search.options}
      />
      <Tab.Screen
        name={tabScreens.matches.name}
        component={tabScreens.matches.component}
        initialParams={{ tabName: tabScreens.matches.name }}
        options={tabScreens.matches.options}
      />
      <Tab.Screen
        name={tabScreens.events.name}
        component={tabScreens.events.component}
        initialParams={{ tabName: tabScreens.events.name }}
        options={tabScreens.events.options}
      />
      <Tab.Screen
        name={tabScreens.profile.name}
        component={tabScreens.profile.component}
        initialParams={{ tabName: tabScreens.profile.name }}
        options={{ tabBarBadge: '' }}
      />
    </Tab.Navigator>
  );
};

export default React.memo<ITabNavigationProps>(withTheme(TabNavigation));
