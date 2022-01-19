import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { withTheme } from 'styled-components/native';

import { teamTabScreens } from 'navigation/screens';
import { ITeamTabNavigationProps } from 'navigation/types';

const Stack = createMaterialTopTabNavigator();

const TAB_NAME = 'TeamTabs';

const TeamTabNavigation: React.FC<ITeamTabNavigationProps> = ({ tabName, theme }) => {
  return (
    <Stack.Navigator
      initialRouteName={`${TAB_NAME}:${teamTabScreens.matches.name}`}
      screenOptions={{
        tabBarLabelStyle: { textTransform: 'none' },
        tabBarStyle: { backgroundColor: 'transparent' },
        tabBarInactiveTintColor: theme?.colors.tertiaryText,
        tabBarActiveTintColor: theme?.colors.secondary,
        tabBarIndicatorStyle: {
          backgroundColor: theme?.colors.secondary,
        },
      }}
    >
      <Stack.Screen
        name={`${TAB_NAME}:${teamTabScreens.matches.name}`}
        initialParams={{ tabName }}
        options={{ tabBarLabel: teamTabScreens.matches.tabName }}
        component={teamTabScreens.matches.component}
      />
      <Stack.Screen
        name={`${TAB_NAME}:${teamTabScreens.events.name}`}
        initialParams={{ tabName }}
        options={{ tabBarLabel: teamTabScreens.events.tabName }}
        component={teamTabScreens.events.component}
      />
    </Stack.Navigator>
  );
};

export default React.memo<ITeamTabNavigationProps>(withTheme(TeamTabNavigation));
