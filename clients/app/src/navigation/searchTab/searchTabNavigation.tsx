import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {withTheme} from 'styled-components/native';
import SearchItem from 'views/screens/SearchItem';

import screens, {TAB_NAME} from './searchTabScreens';
import {ISearchTabNavigationProps} from './types';

const Stack = createMaterialTopTabNavigator();

const SearchTabNavigation: React.FC<ISearchTabNavigationProps> = ({
  theme,
  searchText,
}) => {
  return (
    <Stack.Navigator
      initialRouteName={screens.all.name}
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
        name={`${TAB_NAME}:${screens.all.name}`}
        options={{tabBarLabel: screens.all.tabName}}
        initialParams={{tabName: TAB_NAME}}>
        {props => (
          <SearchItem {...props} searchItem={'all'} searchText={searchText} />
        )}
      </Stack.Screen>
      <Stack.Screen
        name={`${TAB_NAME}:${screens.ultras.name}`}
        options={{tabBarLabel: screens.ultras.tabName}}
        initialParams={{tabName: TAB_NAME}}>
        {props => (
          <SearchItem
            {...props}
            searchItem={'ultras'}
            searchText={searchText}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name={`${TAB_NAME}:${screens.supportersClubs.name}`}
        options={{tabBarLabel: screens.supportersClubs.tabName}}
        initialParams={{tabName: TAB_NAME}}>
        {props => (
          <SearchItem {...props} searchItem={'clubs'} searchText={searchText} />
        )}
      </Stack.Screen>
      <Stack.Screen
        name={`${TAB_NAME}:${screens.team.name}`}
        options={{tabBarLabel: screens.team.tabName}}
        initialParams={{tabName: TAB_NAME}}>
        {props => (
          <SearchItem {...props} searchItem={'teams'} searchText={searchText} />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default React.memo<ISearchTabNavigationProps>(
  withTheme(SearchTabNavigation),
);
