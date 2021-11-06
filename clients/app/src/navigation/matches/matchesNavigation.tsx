import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {withTheme} from 'styled-components/native';
import {ThemeInterface} from 'styled-components';
import {generateCommonScreens} from '../commonScreens';
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
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        headerStyle: {backgroundColor: theme?.colors.bgColor},
        headerTintColor: theme?.colors.secondary,
      }}>
      <Stack.Screen
        name={`${TAB_NAME}:${screens.matches.name}`}
        component={screens.matches.component}
        initialParams={{tabName: TAB_NAME}}
        options={screens.matches.options}
      />
      {generateCommonScreens(TAB_NAME, Stack)}
    </Stack.Navigator>
  );
};

export default React.memo<IMatchesNavigationProps>(
  withTheme(MatchesNavigation),
);
