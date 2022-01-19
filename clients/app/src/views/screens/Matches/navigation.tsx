import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { withTheme } from 'styled-components/native';
import { ThemeInterface } from 'styled-components';
import mainScreens from 'navigation/screens/mainScreens';

const Stack = createNativeStackNavigator();

interface IMatchesNavigationProps {
  theme?: ThemeInterface;
}

const TAB_NAME = mainScreens.matches.tabName;

const MatchesNavigation: React.FC<IMatchesNavigationProps> = ({ theme }) => {
  return (
    <Stack.Navigator
      initialRouteName={`${TAB_NAME}:${mainScreens.matches.initialScreenName}`}
      screenOptions={{
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        headerStyle: { backgroundColor: theme?.colors.bgColor },
        headerTintColor: theme?.colors.secondary,
      }}
    >
      {mainScreens.matches.screens.map(item => {
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

export default React.memo<IMatchesNavigationProps>(withTheme(MatchesNavigation));
