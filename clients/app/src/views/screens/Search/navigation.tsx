import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { withTheme } from 'styled-components/native';
import { ThemeInterface } from 'styled-components';
import { generateCommonScreens } from 'navigation/commonScreens';
import screens from 'navigation/screens';

const Stack = createNativeStackNavigator();

interface ISearchNavigationProps {
  theme?: ThemeInterface;
}

const TAB_NAME = screens.search.tabName;

const SearchNavigation = ({ theme }: ISearchNavigationProps) => {
  return (
    <Stack.Navigator
      initialRouteName={`${TAB_NAME}:${screens.search.initialScreenName}`}
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: { backgroundColor: theme?.colors.bgColor },
        headerTintColor: theme?.colors.secondary,
        headerBackTitleVisible: false,
      }}
    >
      {screens.search.screens.map(item => {
        return (
          <Stack.Screen
            key={`${TAB_NAME}:${item.name}`}
            name={`${TAB_NAME}:${item.name}`}
            component={item.component}
            initialParams={{ tabName: TAB_NAME }}
            options={item.options}
          />
        );
      })}
      {generateCommonScreens(TAB_NAME, Stack)}
    </Stack.Navigator>
  );
};

export default React.memo<ISearchNavigationProps>(withTheme(SearchNavigation));
