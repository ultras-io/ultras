import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {withTheme} from 'styled-components/native';

import screens, {TAB_NAME} from './teamTabScreens';
import {ITeamTabNavigationProps} from './types';

const Stack = createMaterialTopTabNavigator();

const TeamTabNavigation: React.FC<ITeamTabNavigationProps> = ({
  tabName,
  theme,
}) => {
  return (
    <Stack.Navigator
      initialRouteName={`${TAB_NAME}:${screens.matches.name}`}
      screenOptions={{
        tabBarLabelStyle: {textTransform: 'none'},
        tabBarStyle: {backgroundColor: 'transparent'},
        tabBarInactiveTintColor: theme?.colors.tertiaryText,
        tabBarActiveTintColor: theme?.colors.secondary,
        tabBarIndicatorStyle: {
          backgroundColor: theme?.colors.secondary,
        },
      }}>
      <Stack.Screen
        name={`${TAB_NAME}:${screens.matches.name}`}
        initialParams={{tabName}}
        options={{tabBarLabel: screens.matches.tabName}}
        component={screens.matches.component}
      />
      <Stack.Screen
        name={`${TAB_NAME}:${screens.events.name}`}
        initialParams={{tabName}}
        options={{tabBarLabel: screens.events.tabName}}
        component={screens.events.component}
      />
    </Stack.Navigator>
  );
};

export default React.memo<ITeamTabNavigationProps>(
  withTheme(TeamTabNavigation),
);
