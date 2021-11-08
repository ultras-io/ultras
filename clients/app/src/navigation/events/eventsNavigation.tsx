import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {withTheme} from 'styled-components/native';
import {ThemeInterface} from 'styled-components';
import {generateCommonScreens} from '../commonScreens';
import screens, {TAB_NAME} from './eventsScreens';

const Stack = createNativeStackNavigator();

interface IEventsNavigationProps {
  theme?: ThemeInterface;
}

const EventsNavigation: React.FC<IEventsNavigationProps> = ({theme}) => {
  return (
    <Stack.Navigator
      initialRouteName={`${TAB_NAME}:${screens.events.name}`}
      screenOptions={{
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        headerStyle: {backgroundColor: theme?.colors.bgColor},
        headerTintColor: theme?.colors.secondary,
      }}>
      <Stack.Screen
        name={`${TAB_NAME}:${screens.events.name}`}
        component={screens.events.component}
        initialParams={{tabName: TAB_NAME}}
        options={screens.events.options}
      />
      {generateCommonScreens(TAB_NAME, Stack)}
    </Stack.Navigator>
  );
};

export default React.memo<IEventsNavigationProps>(withTheme(EventsNavigation));
