import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {withTheme} from 'styled-components/native';
import {ThemeInterface} from 'styled-components';
import {generateCommonScreens, COMMON_SCREENS} from '../commonScreens';
import screens, {TAB_NAME} from './profileScreens';

const Stack = createNativeStackNavigator();

interface IProfileNavigationProps {
  theme?: ThemeInterface;
}

const ProfileNavigation: React.FC<IProfileNavigationProps> = ({theme}) => {
  return (
    <Stack.Navigator
      initialRouteName={`${TAB_NAME}:${COMMON_SCREENS.profile}`}
      screenOptions={{
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        headerStyle: {backgroundColor: theme?.colors.bgColor},
        headerTintColor: theme?.colors.secondary,
      }}>
      {generateCommonScreens(TAB_NAME, Stack)}
      <Stack.Screen
        name={`${TAB_NAME}:${screens.settings.name}`}
        component={screens.settings.component}
        options={screens.settings.options}
        initialParams={{tabName: TAB_NAME}}
      />
      <Stack.Screen
        name={`${TAB_NAME}:${screens.notifications.name}`}
        component={screens.notifications.component}
        options={screens.notifications.options}
        initialParams={{tabName: TAB_NAME}}
      />
    </Stack.Navigator>
  );
};

export default React.memo<IProfileNavigationProps>(
  withTheme(ProfileNavigation),
);
