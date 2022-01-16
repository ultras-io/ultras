import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { withTheme } from 'styled-components/native';
import { ThemeInterface } from 'styled-components';
import { listModalTabScreens } from 'navigation/screens';

const Stack = createMaterialTopTabNavigator();

interface IListModalTabProps {
  theme?: ThemeInterface;
}

const TAB_NAME = 'ListModal';

const ListModalTabMavigation: React.FC<IListModalTabProps> = ({ theme }) => {
  return (
    <Stack.Navigator
      initialRouteName={`${TAB_NAME}:${listModalTabScreens.footballClubs.name}`}
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
        name={`${TAB_NAME}:${listModalTabScreens.footballClubs.name}`}
        options={{ tabBarLabel: listModalTabScreens.footballClubs.name }}
        component={listModalTabScreens.footballClubs.component}
        initialParams={{ tabName: TAB_NAME }}
      />
      <Stack.Screen
        name={`${TAB_NAME}:${listModalTabScreens.nationalTeams.name}`}
        options={{ tabBarLabel: listModalTabScreens.nationalTeams.name }}
        component={listModalTabScreens.nationalTeams.component}
        initialParams={{ tabName: TAB_NAME }}
      />
    </Stack.Navigator>
  );
};

export default React.memo<IListModalTabProps>(withTheme(ListModalTabMavigation));
