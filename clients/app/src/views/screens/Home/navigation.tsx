import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { withTheme } from 'styled-components/native';
import { ThemeInterface } from 'styled-components';
import mainScreens from 'views/navigation/screens/mainScreens';
const Stack = createNativeStackNavigator();

interface IHomeNavigationProps {
  theme?: ThemeInterface;
}

const TAB_NAME = mainScreens.home.tabName;

const HomeNavigation: React.FC<IHomeNavigationProps> = ({ theme }) => {
  return (
    <Stack.Navigator
      initialRouteName={`${TAB_NAME}:${mainScreens.home.initialScreenName}`}
      screenOptions={{
        // @TODO move to navigation screens object
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        headerStyle: { backgroundColor: theme?.colors.bgColor },
        headerTintColor: theme?.colors.secondary,
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

export default React.memo<IHomeNavigationProps>(withTheme(HomeNavigation));
