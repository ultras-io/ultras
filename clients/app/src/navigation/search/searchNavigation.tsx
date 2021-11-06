import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {withTheme} from 'styled-components/native';
import {ThemeInterface} from 'styled-components';

import screens, {TAB_NAME} from './searchScreens';

const Stack = createNativeStackNavigator();

interface ISearchNavigationProps {
  theme?: ThemeInterface;
}

const SearchNavigation = ({theme}: ISearchNavigationProps) => {
  return (
    <Stack.Navigator
      initialRouteName={screens.search.name}
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: {backgroundColor: theme?.colors.bgColor},
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen
        name={`${TAB_NAME}:${screens.search.name}`}
        component={screens.search.component}
        initialParams={{tabName: TAB_NAME}}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={`${TAB_NAME}:${screens.supportersClub.name}`}
        component={screens.supportersClub.component}
        initialParams={{tabName: TAB_NAME}}
        options={{
          headerTintColor: theme?.colors.secondary,
          ...screens.supportersClub.options,
        }}
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
      />
      <Stack.Screen
        name={`${TAB_NAME}:${screens.team.name}`}
        component={screens.team.component}
        initialParams={{tabName: TAB_NAME}}
        options={{
          headerTintColor: theme?.colors.secondary,
          ...screens.team.options,
        }}
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

export default React.memo<ISearchNavigationProps>(withTheme(SearchNavigation));
