import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { withTheme } from 'styled-components/native';
import { ThemeInterface } from 'styled-components';
import mainScreens from 'navigation/screens/mainScreens';
import COMMON_SCREENS from 'navigation/screens/commonScreens';

const Stack = createNativeStackNavigator();

interface IProfileNavigationProps {
  theme?: ThemeInterface;
}
const TAB_NAME = mainScreens.profile.tabName;

const ProfileNavigation: React.FC<IProfileNavigationProps> = ({ theme }) => {
  return (
    <Stack.Navigator
      initialRouteName={`${TAB_NAME}:${COMMON_SCREENS.profile.name}`}
      screenOptions={{
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        headerStyle: { backgroundColor: theme?.colors.bgColor },
        headerTintColor: theme?.colors.secondary,
      }}
    >
      {mainScreens.profile.screens.map(item => {
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

export default React.memo<IProfileNavigationProps>(withTheme(ProfileNavigation));
