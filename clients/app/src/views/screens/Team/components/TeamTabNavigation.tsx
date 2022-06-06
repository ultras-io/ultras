import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useTheme } from 'themes';
import { teamTabScreens } from 'views/navigation/screens';
import { ITeamTabNavigationProps } from 'views/navigation/types';

const TopTab = createMaterialTopTabNavigator();
const TAB_NAME = 'TeamTabs';

const TeamTabNavigation: React.FC<ITeamTabNavigationProps> = ({ tabName, id }) => {
  const { colors } = useTheme();

  return (
    <TopTab.Navigator
      initialRouteName={`${TAB_NAME}:${teamTabScreens.matches.name}`}
      screenOptions={{
        tabBarLabelStyle: { textTransform: 'none' },
        tabBarStyle: { backgroundColor: colors.transparent },
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarActiveTintColor: colors.textAction,
        tabBarIndicatorStyle: {
          backgroundColor: colors.textAction,
        },
        lazy: true,
      }}
      sceneContainerStyle={{
        backgroundColor: colors.transparent,
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

export default React.memo<ITeamTabNavigationProps>(TeamTabNavigation);
