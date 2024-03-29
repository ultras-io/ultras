import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'themes';
import mainScreens from 'views/navigation/screens/mainScreens';

const Stack = createNativeStackNavigator();

interface IMatchesNavigationProps {}

const TAB_NAME = mainScreens.matches.tabName;

const MatchesNavigation: React.FC<IMatchesNavigationProps> = () => {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName={`${TAB_NAME}:${mainScreens.matches.initialScreenName}`}
      screenOptions={{
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: colors.backgroundMain,
        },
        headerTintColor: colors.iconNavigation,
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
