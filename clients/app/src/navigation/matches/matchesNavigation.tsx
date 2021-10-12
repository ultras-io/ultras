import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {withTheme} from 'styled-components/native';
import {ThemeInterface} from 'styled-components';

import screens, {TAB_NAME} from './matchesScreens';

const Stack = createNativeStackNavigator();

interface IMatchesNavigationProps {
  theme?: ThemeInterface;
}

const MatchesNavigation: React.FC<IMatchesNavigationProps> = ({theme}) => {
  return (
    <Stack.Navigator
      initialRouteName={screens.matches.name}
      screenOptions={{
        headerStyle: {backgroundColor: theme?.colors.bgColor},
        headerTintColor: theme?.colors.text,
      }}>
      <Stack.Screen
        name={`${TAB_NAME}:${screens.matches.name}`}
        component={screens.matches.component}
        initialParams={{tabName: TAB_NAME}}
        options={screens.matches.options}
      />
      <Stack.Screen
        name={`${TAB_NAME}:${screens.match.name}`}
        component={screens.match.component}
        initialParams={{tabName: TAB_NAME}}
      />
      <Stack.Screen
        name={`${TAB_NAME}:${screens.event.name}`}
        component={screens.event.component}
        initialParams={{tabName: TAB_NAME}}
      />
    </Stack.Navigator>
  );
};

export default React.memo<IMatchesNavigationProps>(
  withTheme(MatchesNavigation),
);
