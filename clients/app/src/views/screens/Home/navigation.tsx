import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { withTheme } from 'styled-components/native';
import { ThemeInterface } from 'styled-components';
import { generateCommonScreens } from 'navigation/commonScreens';
import screens from 'navigation/screens';

const Stack = createNativeStackNavigator();

interface IHomeNavigationProps {
  theme?: ThemeInterface;
}

const TAB_NAME = screens.home.tabName;

const HomeNavigation: React.FC<IHomeNavigationProps> = ({ theme }) => {
  return (
    <Stack.Navigator
      initialRouteName={`${TAB_NAME}:${screens.home.initialScreenName}`}
      screenOptions={{
        // @TODO move to navigation screens object
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        headerStyle: { backgroundColor: theme?.colors.bgColor },
        headerTintColor: theme?.colors.secondary,
      }}
    >
      {screens.home.screens.map(item => {
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

export default React.memo<IHomeNavigationProps>(withTheme(HomeNavigation));
