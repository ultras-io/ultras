import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {withTheme} from 'styled-components/native';
import {ThemeInterface} from 'styled-components';

import screens, {TAB_NAME} from './homeScreens';

const Stack = createNativeStackNavigator();

interface IHomeNavigationProps {
  theme?: ThemeInterface;
}

const HomeNavigation: React.FC<IHomeNavigationProps> = ({theme}) => {
  return (
    <Stack.Navigator
      initialRouteName={screens.home.name}
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
      <Stack.Screen
        name={`${TAB_NAME}:${screens.supportersClub.name}`}
        component={screens.supportersClub.component}
        initialParams={{tabName: TAB_NAME}}
        options={screens.supportersClub.options}
      />
      <Stack.Screen
        name={`${TAB_NAME}:${screens.event.name}`}
        component={screens.event.component}
        initialParams={{tabName: TAB_NAME}}
      />
      <Stack.Screen
        name={`${TAB_NAME}:${screens.match.name}`}
        component={screens.match.component}
        initialParams={{tabName: TAB_NAME}}
        options={screens.match.options}
      />
      <Stack.Group screenOptions={{presentation: 'modal'}}>
        <Stack.Screen
          name={`${TAB_NAME}:${screens.supportersClubAbout.name}`}
          component={screens.supportersClubAbout.component}
          initialParams={{tabName: TAB_NAME}}
          options={screens.supportersClubAbout.options}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default React.memo<IHomeNavigationProps>(withTheme(HomeNavigation));
