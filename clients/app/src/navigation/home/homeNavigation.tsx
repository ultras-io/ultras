import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {withTheme} from 'styled-components/native';
import {ThemeInterface} from 'styled-components';
import {generateCommonScreens} from '../commonScreens';
import screens, {TAB_NAME} from './homeScreens';

const Stack = createNativeStackNavigator();

interface IHomeNavigationProps {
  theme?: ThemeInterface;
}

const HomeNavigation: React.FC<IHomeNavigationProps> = ({theme}) => {
  return (
    <Stack.Navigator
      initialRouteName={`${TAB_NAME}:${screens.home.name}`}
      screenOptions={{
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        headerStyle: {backgroundColor: theme?.colors.bgColor},
        headerTintColor: theme?.colors.secondary,
      }}>
      <Stack.Screen
        name={`${TAB_NAME}:${screens.home.name}`}
        component={screens.home.component}
        initialParams={{tabName: TAB_NAME}}
        options={screens.home.options}
      />
      {generateCommonScreens(TAB_NAME, Stack)}
    </Stack.Navigator>
  );
};

export default React.memo<IHomeNavigationProps>(withTheme(HomeNavigation));
