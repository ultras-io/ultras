import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { withTheme } from 'styled-components/native';
import { teamTabScreens } from 'views/navigation/screens';
import { ITeamTabNavigationProps } from 'views/navigation/types';

const TopTab = createMaterialTopTabNavigator();
const TAB_NAME = 'TeamTabs';

const TeamTabNavigation: React.FC<ITeamTabNavigationProps> = ({ theme, tabName, id }) => {
  return (
    <TopTab.Navigator
      lazy
      initialRouteName={`${TAB_NAME}:${teamTabScreens.matches.name}`}
      screenOptions={{
        tabBarLabelStyle: { textTransform: 'none' },
        tabBarStyle: { backgroundColor: 'transparent' },
        tabBarInactiveTintColor: theme?.colors.tertiaryText,
        tabBarActiveTintColor: theme?.colors.secondary,
        tabBarIndicatorStyle: {
          backgroundColor: 'theme?.colors.secondary',
        },
      }}
    >
      <TopTab.Screen
        name={`${TAB_NAME}:${teamTabScreens.matches.name}`}
        initialParams={{ tabName, teamId: id }}
        options={{ tabBarLabel: teamTabScreens.matches.tabName }}
        component={teamTabScreens.matches.component}
      />
      <TopTab.Screen
        name={`${TAB_NAME}:${teamTabScreens.events.name}`}
        initialParams={{ tabName }}
        options={{ tabBarLabel: teamTabScreens.events.tabName }}
        component={teamTabScreens.events.component}
      />
    </TopTab.Navigator>
  );
};

export default React.memo<ITeamTabNavigationProps>(withTheme(TeamTabNavigation));
