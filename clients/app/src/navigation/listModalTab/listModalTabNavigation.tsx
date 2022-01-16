import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { withTheme } from 'styled-components/native';
import { ThemeInterface } from 'styled-components';
import screens, { TAB_NAME } from './listModalTabScreens';

const Stack = createMaterialTopTabNavigator();

interface IListModalTabProps {
  theme?: ThemeInterface;
}

const ListModalTab: React.FC<IListModalTabProps> = ({ theme }) => {
  return (
    <Stack.Navigator
      initialRouteName={`${TAB_NAME}:${screens.footballClubs.name}`}
      screenOptions={{
        tabBarLabelStyle: { textTransform: 'none' },
        tabBarStyle: { backgroundColor: 'transparent' },
        tabBarInactiveTintColor: theme?.colors.text,
        tabBarActiveTintColor: theme?.colors.secondaryText,
        tabBarIndicatorStyle: {
          backgroundColor: theme?.colors.secondary,
        },
      }}
    >
      <Stack.Screen
        name={`${TAB_NAME}:${screens.footballClubs.name}`}
        options={{ tabBarLabel: screens.footballClubs.name }}
        component={screens.footballClubs.component}
        initialParams={{ tabName: TAB_NAME }}
      />
      <Stack.Screen
        name={`${TAB_NAME}:${screens.nationalTeams.name}`}
        options={{ tabBarLabel: screens.nationalTeams.name }}
        component={screens.nationalTeams.component}
        initialParams={{ tabName: TAB_NAME }}
      />
    </Stack.Navigator>
  );
};

export default React.memo<IListModalTabProps>(withTheme(ListModalTab));
