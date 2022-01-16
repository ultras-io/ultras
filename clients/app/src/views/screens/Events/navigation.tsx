import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { withTheme } from 'styled-components/native';
import { ThemeInterface } from 'styled-components';
import { mainScreens as screens } from 'navigation/screens';

const Stack = createNativeStackNavigator();

interface IEventsNavigationProps {
  theme?: ThemeInterface;
}

const TAB_NAME = screens.events.tabName;

const EventsNavigation: React.FC<IEventsNavigationProps> = ({ theme }) => {
  return (
    <Stack.Navigator
      initialRouteName={`${TAB_NAME}:${screens.events.initialScreenName}`}
      screenOptions={{
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        headerStyle: { backgroundColor: theme?.colors.bgColor },
        headerTintColor: theme?.colors.secondary,
      }}
    >
      {screens.events.screens.map(item => {
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

export default React.memo<IEventsNavigationProps>(withTheme(EventsNavigation));
