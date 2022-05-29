import React from 'react';
import { Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'themes';
import mainScreens from 'views/navigation/screens/mainScreens';
import COMMON_SCREENS from 'views/navigation/screens/commonScreens';

const Stack = createNativeStackNavigator();

interface IProfileNavigationProps {}
const TAB_NAME = mainScreens.profile.tabName;

const ProfileNavigation: React.FC<IProfileNavigationProps> = ({}) => {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName={`${TAB_NAME}:${COMMON_SCREENS.profile.name}`}
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

export default React.memo<IProfileNavigationProps>(ProfileNavigation);
