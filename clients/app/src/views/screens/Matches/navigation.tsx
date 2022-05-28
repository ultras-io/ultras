import React from 'react';
import { Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'themes';
import mainScreens from 'views/navigation/screens/mainScreens';

const Stack = createNativeStackNavigator();

interface IMatchesNavigationProps {}

const TAB_NAME = mainScreens.matches.tabName;

const MatchesNavigation: React.FC<IMatchesNavigationProps> = ({}) => {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName={`${TAB_NAME}:${mainScreens.matches.initialScreenName}`}
      screenOptions={{
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        headerStyle: Platform.select({
          android: {
            backgroundColor: colors.headerBackground,
          },
          ios: {
            backgroundColor: colors.transparent,
          },
        }),
        headerTintColor: colors.headerNavigationButton,
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

export default React.memo<IMatchesNavigationProps>(MatchesNavigation);
