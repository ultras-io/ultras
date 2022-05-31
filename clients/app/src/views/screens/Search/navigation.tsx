import React from 'react';
import { Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'themes';
import mainScreens from 'views/navigation/screens/mainScreens';

const Stack = createNativeStackNavigator();

interface ISearchNavigationProps {}

const TAB_NAME = mainScreens.search.tabName;

const SearchNavigation: React.FC<ISearchNavigationProps> = ({}) => {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName={`${TAB_NAME}:${mainScreens.initialScreenName}`}
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: colors.backgroundMain,
        },
        headerTintColor: colors.iconNavigation,
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

export default React.memo<ISearchNavigationProps>(SearchNavigation);
