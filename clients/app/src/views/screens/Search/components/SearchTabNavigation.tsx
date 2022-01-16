import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { withTheme } from 'styled-components/native';
import SearchItem from 'views/components/compositions/SearchItem';

import { searchTabScreens } from 'navigation/screens';
import { ISearchTabNavigationProps } from 'navigation/types';

const Stack = createMaterialTopTabNavigator();
const TAB_NAME = 'Search';

const SearchTabNavigation: React.FC<ISearchTabNavigationProps> = ({
  theme,
  searchText,
}) => {
  return (
    <Stack.Navigator
      initialRouteName={`${TAB_NAME}:${searchTabScreens.all.name}`}
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
        name={`${TAB_NAME}:${searchTabScreens.all.name}`}
        options={{ tabBarLabel: searchTabScreens.all.tabName }}
        initialParams={{ tabName: TAB_NAME }}
      >
        {props => <SearchItem {...props} searchItem={'all'} searchText={searchText} />}
      </Stack.Screen>
      <Stack.Screen
        name={`${TAB_NAME}:${searchTabScreens.ultras.name}`}
        options={{ tabBarLabel: searchTabScreens.ultras.tabName }}
        initialParams={{ tabName: TAB_NAME }}
      >
        {props => <SearchItem {...props} searchItem={'ultras'} searchText={searchText} />}
      </Stack.Screen>
      <Stack.Screen
        name={`${TAB_NAME}:${searchTabScreens.supportersClubs.name}`}
        options={{ tabBarLabel: searchTabScreens.supportersClubs.tabName }}
        initialParams={{ tabName: TAB_NAME }}
      >
        {props => <SearchItem {...props} searchItem={'clubs'} searchText={searchText} />}
      </Stack.Screen>
      <Stack.Screen
        name={`${TAB_NAME}:${searchTabScreens.team.name}`}
        options={{ tabBarLabel: searchTabScreens.team.tabName }}
        initialParams={{ tabName: TAB_NAME }}
      >
        {props => <SearchItem {...props} searchItem={'teams'} searchText={searchText} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default React.memo<ISearchTabNavigationProps>(withTheme(SearchTabNavigation));
