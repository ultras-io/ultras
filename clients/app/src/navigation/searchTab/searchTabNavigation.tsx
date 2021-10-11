import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {withTheme} from 'styled-components/native';
import {ThemeInterface} from 'styled-components';
import screens, {TAB_NAME} from './searchTabScreens';

const Stack = createMaterialTopTabNavigator();

interface ISearchTabNavigationProps {
  theme?: ThemeInterface;
}
const SearchTabNavigation: React.FC<ISearchTabNavigationProps> = ({theme}) => {
  return (
    <Stack.Navigator
      initialRouteName={screens.all.name}
      screenOptions={{
        tabBarLabelStyle: {textTransform: 'none'},
        tabBarStyle: {backgroundColor: 'transparent'},
        tabBarInactiveTintColor: theme?.colors.text,
        tabBarActiveTintColor: theme?.colors.secondaryText,
        tabBarIndicatorStyle: {
          backgroundColor: theme?.colors.secondary,
        },
      }}>
      <Stack.Screen
        name={`${TAB_NAME}:${screens.all.name}`}
        options={{tabBarLabel: screens.all.name}}
        component={screens.all.component}
        initialParams={{tabName: TAB_NAME}}
      />
      <Stack.Screen
        name={`${TAB_NAME}:${screens.event.name}`}
        options={{tabBarLabel: screens.event.name}}
        component={screens.event.component}
        initialParams={{tabName: TAB_NAME}}
      />
      <Stack.Screen
        name={`${TAB_NAME}:${screens.team.name}`}
        options={{tabBarLabel: screens.team.name}}
        component={screens.team.component}
        initialParams={{tabName: TAB_NAME}}
      />
    </Stack.Navigator>
  );
};

export default React.memo<ISearchTabNavigationProps>(
  withTheme(SearchTabNavigation),
);
