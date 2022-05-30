import React from 'react';
import { Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'themes';
import mainScreens from 'views/navigation/screens/mainScreens';

const Stack = createNativeStackNavigator();

interface IHomeNavigationProps {}

const TAB_NAME = mainScreens.home.tabName;

const HomeNavigation: React.FC<IHomeNavigationProps> = () => {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName={`${TAB_NAME}:${mainScreens.home.initialScreenName}`}
      screenOptions={{
        // @TODO move to navigation screens object
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: colors.backgroundMain,
        },
        headerTintColor: colors.iconNavigation,
      }}
    >
      {mainScreens.home.screens.map(item => {
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

export default React.memo<IHomeNavigationProps>(HomeNavigation);
