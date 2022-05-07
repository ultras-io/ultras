import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { withTheme } from 'styled-components/native';
import { ThemeInterface } from 'styled-components';
import { listModalTabScreens } from 'views/navigation/screens';
import { FilterProvider } from '../contexts/FilterContext';

const Stack = createMaterialTopTabNavigator();

interface IListModalTabProps {
  theme?: ThemeInterface;
  searchText: string;
}

const TAB_NAME = 'ListModal';

const ListModalTabNavigation: React.FC<IListModalTabProps> = ({ theme, searchText }) => {
  return (
    <FilterProvider filter={{ searchText }}>
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
          initialParams={{ tabName: TAB_NAME, searchText: searchText }}
        />
        <Stack.Screen
          name={`${TAB_NAME}:${listModalTabScreens.nationalTeams.name}`}
          options={{ tabBarLabel: listModalTabScreens.nationalTeams.name }}
          component={listModalTabScreens.nationalTeams.component}
          initialParams={{ tabName: TAB_NAME, searchText: searchText }}
        />
      </Stack.Navigator>
    </FilterProvider>
  );
};

export default React.memo<IListModalTabProps>(withTheme(ListModalTabNavigation));
