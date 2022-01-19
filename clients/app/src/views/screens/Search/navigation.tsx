import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { withTheme } from 'styled-components/native';
import { ThemeInterface } from 'styled-components';
import mainScreens from 'navigation/screens/mainScreens';

const Stack = createNativeStackNavigator();

interface ISearchNavigationProps {
  theme?: ThemeInterface;
}

const TAB_NAME = mainScreens.search.tabName;

const SearchNavigation = ({ theme }: ISearchNavigationProps) => {
  return (
    <Stack.Navigator
      initialRouteName={`${TAB_NAME}:${mainScreens.initialScreenName}`}
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: { backgroundColor: theme?.colors.bgColor },
        headerTintColor: theme?.colors.secondary,
        headerBackTitleVisible: false,
      }}
    >
      {mainScreens.search.screens.map(item => {
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
    </Stack.Navigator>
  );
};

export default React.memo<ISearchNavigationProps>(withTheme(SearchNavigation));
