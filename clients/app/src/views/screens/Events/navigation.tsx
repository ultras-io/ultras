import React from 'react';
import { Platform } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'themes';
import mainScreens from 'views/navigation/screens/mainScreens';

const Stack = createNativeStackNavigator();

interface IEventsNavigationProps {}

const TAB_NAME = mainScreens.events.tabName;

const EventsNavigation: React.FC<IEventsNavigationProps> = ({}) => {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName={`${TAB_NAME}:${mainScreens.events.initialScreenName}`}
      screenOptions={{
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        headerStyle: Platform.select({
          android: {
            backgroundColor: colors.backgroundMain,
          },
          ios: {
            backgroundColor: colors.transparent,
          },
        }),
        headerTintColor: colors.iconNavigation,
      }}
    >
      {mainScreens.events.screens.map(item => {
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

export default React.memo<IEventsNavigationProps>(EventsNavigation);
